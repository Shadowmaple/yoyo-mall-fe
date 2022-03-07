// pages/order/evaluate/evaluate.js
const request = require('../../../utils/request/comment')
const orderRequest = require('../../../utils/request/order')
const uploadRequest = require('../../../utils/request/upload')

const staticLevels = [{
  level: 0,
  value: '好评',
  icon: '/images/icon/evaluate-positive.png',
  selectedIcon: '/images/icon/evaluate-positive-select.png',
}, {
  level: 1,
  value: '一般',
  icon: '/images/icon/evaluate-positive.png',
  selectedIcon: '/images/icon/evaluate-positive-select.png',
}, {
  level: 2,
  value: '差评',
  icon: '/images/icon/evaluate-medium.png',
  selectedIcon: '/images/icon/evaluate-medium-select.png',
}]

Page({
  data: {
    staticLevels: staticLevels,
    content: '',
    pictures: [],
    level: 0, // 0好评，1一般，2差评
    score: 10, // 评分，1-10
    isAnonymous: false,
  },
  orderID: 0,

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let orderID = options.order_id
    this.orderID = orderID
  },

  bindSwitchAnonymous: function(e) {
    this.setData({
      isAnonymous: !this.data.isAnonymous,
    })
  },

  bindScore: function (e) {
    let score = Number(e.detail.value)
    this.data.score = score
  },

  bindLevel: function (e) {
    let level = e.currentTarget.dataset.level
    this.setData({
      level: level,
    })
  },

  bindInput: function (e) {
    let value = e.detail.value
    this.data.content = value
  },

  // 请求发起评价
  // 1.评价
  // 2.更改订单状态
  // 3.成功后返回上一页
  bindEvaluate: function (e) {
    if (this.orderID <= 0) {
      return
    }
    // 请求
    let req = {
      id: 0,
      order_id: Number(this.orderID),
      content: this.data.content,
      score: this.data.score,
      level: this.data.level,
      pictures: this.data.pictures,
      is_anonymous: this.data.isAnonymous,
    }
    request.evaluationCreate(req, res => {
      if (res.code != 0) {
        console.warn('request.evaluationCreate error:', res)
        return
      }
      console.log('评价成功; req:', req)

      // 改变订单状态为已评价/交易完成
      let orderReq = {
        id: this.orderID,
        status: 4,
      }
      orderRequest.orderUpdate(orderReq, res => {
        if (res.code != 0) {
          console.warn('request.orderUpdate error:', res)
          return
        }
        console.log('订单修改评价状态完成：', orderReq)

        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 2000,
        })
        wx.navigateBack({
          delta: 0,
        })
      })
    })
  },

  bindUploadPic: function (e) {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: res => {
        console.log(res.tempFiles)
        let tempFiles = res.tempFiles
        if (tempFiles.length == 0) {
          return
        }
        let item = tempFiles[0]
        if (item.fileType != 'image') {
          return
        }
        let path = item.tempFilePath
        let req = {
          image: path,
        }
        uploadRequest.requestUpload(req, res => {
          if (res.code != 0) {
            console.warn('requestUpload error:', res)
            wx.showToast({
              title: '上传图片失败',
              icon: 'error',
              duration: 1500,
            })
            return
          }
          let url = res.data.url
          console.log('上传成功：', url)
          let pictures = this.data.pictures
          pictures.push(url)
          this.setData({
            pictures: pictures,
          })
        })
      }
    })
  },
})