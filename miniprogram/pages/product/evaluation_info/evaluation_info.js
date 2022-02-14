// pages/product/evaluation_info/evaluation_info.js
const mock = require('../../../utils/mock-data/comment')
const request = require('../../../utils/request/comment')

Page({
  data: {
    evaluation: mock.evaluation,
    comments: mock.commentList,
    noMore: false,
  },

  onLoad: function (options) {
    if (options == null || options == "") {
      return
    }
    let data = JSON.parse(options.data)
    let id = data.id

    // todo 请求评论列表
    // ...
    
    this.setData({
      evaluation: data,
    })
  },

  bindPublish: function (e) {
    let value = e.detail.value
    let req = {
      id: 0,
      content: value,
      is_anonymous: false,
    }

    request.commentCreateOrUpdate(req, res => {
      if (res.code != 0) {
        return
      }
    })
  },

  bindLike: function (e) {
    let kind = Number(e.currentTarget.dataset.kind)
    var req = {
      kind: kind,
    }
    if (kind == 0) {
      req.id = this.data.evaluation.id
      req.expected_status = !this.data.evaluation.has_liked
    } else {
      var idx = e.currentTarget.dataset.idx
      req.id = this.data.comments[idx].id
      req.expected_status = !this.data.comments[idx].has_liked
    }

    wx.showLoading()

    setTimeout(function() {
      wx.hideLoading()
    }, 2000)

    request.like(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.like error: ', res.code, res.msg)
        wx.showToast({
          title: '内部错误',
          icon: 'error'
        })
        return
      }

      // 评价点赞
      if (kind == 0) {
        let eva = this.data.evaluation
        eva.has_liked = !eva.has_liked
        eva.like_num = eva.has_liked ? eva.like_num+1 : eva.like_num-1
        this.setData({
          evaluation: eva,
        })
        return
      }

      // 回复点赞
      let comments = this.data.comments
      comments[idx].has_liked = !comments[idx].has_liked
      comments[idx].like_num = comments[idx].has_liked ? comments[idx].like_num+1 : comments[idx].like_num-1
      this.setData({
        comments: comments,
      })
    })

  },

})