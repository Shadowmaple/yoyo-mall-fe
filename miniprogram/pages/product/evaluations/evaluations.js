// pages/product/evaluations/evaluations.js
const mock = require('../../../utils/mock-data/comment')
const request = require('../../../utils/request/comment')

Page({
  data: {
    moreData: true,
    // list: mock.evaluationList,
    list: [],
  },
  productID: 0,
  req: {
    limit: 10,
    page: 0,
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    this.productID = Number(options.product_id)
    this.requestList(true)
  },

  onPullDownRefresh: function () {
    this.requestList(true)
  },

  onReachBottom: function () {
    if (!this.moreData) {
      return
    }
    this.requestList(false)
  },

  // 请求评价列表
  requestList: function (refresh) {
    this.req.page = refresh ? 0 : this.req.page + 1
    let req = {
      limit: this.req.limit,
      page: this.req.page,
      product_id: this.productID,
    }

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)

    request.evaluationList(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.evaluationList error:', res)
        return
      }
      let list = refresh ? new Array : this.data.list
      if (res.data.total == 0) {
        this.setData({
          moreData: false,
          list: list,
        })
        return
      }
      list = list.concat(res.data.list)
      this.setData({
        moreData: true,
        list: list,
      })
    })
  },

  bindJumpInfo: function (e) {
    let id = e.currentTarget.dataset.id

    // json字符串过长会被截取，解决办法：传id，新页面再请求详情信息
    let url = "../evaluation_info/evaluation_info?id=" + id
    wx.navigateTo({
      url: url,
    })
  },

  // 评价点赞
  bindLike: function (e) {
    let idx = e.currentTarget.dataset.idx
    let eva = this.data.list[idx]
    let req = {
      kind: 0,
      id: eva.id,
      expected_status: !eva.has_liked,
    }

    wx.showLoading()
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)

    request.like(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.like error: ', res)
        wx.showToast({
          title: '点赞失败，内部错误',
          icon: 'error',
          duration: 1500,
        })
        return
      }

      console.log('点赞完成；req:', req)

      eva.has_liked = req.expected_status
      eva.like_num = eva.has_liked ? eva.like_num+1 : eva.like_num-1
      let list = this.data.list
      list[idx] = eva
      this.setData({
        list: list,
      })
      return
    })
  },
})