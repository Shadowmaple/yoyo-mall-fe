// pages/feedback/feedback.js
const staticType = ['产品建议', '功能异常', '违规举报', '交易投诉']
const request = require('../../utils/request/feedback')
const uploadRequest = require('../../utils/request/upload')

Page({
  data: {
    typeList: staticType,
    content: "",
    curType: 0,
    pictures: [],
  },

  onLoad: function (options) {},

  bindTypeChange: function (e) {
    let idx = e.detail.value
    this.setData({
      curType: idx,
    })
  },

  bindContentInput: function (e) {
    this.data.content = e.detail.value
  },

  bindAddPicture: function (e) {
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

  // 确认反馈
  bindConfirm: function (e) {
    if (this.data.content == '') {
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '内容不能为空！',
      })
      return
    }
    let req = {
      kind: Number(this.data.curType),
      content: this.data.content,
      pictures: this.data.pictures,
    }

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)

    request.feedback(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.feedback error:', res)
        wx.showToast({
          title: '反馈失败：'+ res.msg,
          icon: 'error',
          duration: 2000,
        })
        return
      }
      console.log('request.feedback ok')
      wx.showModal({
        content: '反馈成功',
        showCancel: false,
        success: res => {
          wx.navigateBack({
            delta: 0,
          })
        },
      })
    })
  },
})