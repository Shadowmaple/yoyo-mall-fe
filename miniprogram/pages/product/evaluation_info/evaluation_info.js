// pages/product/evaluation_info/evaluation_info.js
const mock = require('../../../utils/mock-data/comment')
const request = require('../../../utils/request/comment')

Page({
  data: {
    moreData: true,
    evaluation: mock.evaluation,
    comments: mock.commentList,
  },
  id: 0, // 评价id
  req: {
    limit: 10,
    page: 0,
  },

  onLoad: function (options) {
    console.info('-- evaluation_info onload: ', option)
    if (options == null) {
      return
    }
    this.id = Number(options.id)

    // 请求评价信息和评论列表
    this.requestEvaluation()
    this.requestComments(true)
  },

  onReachBottom: function () {
    if (!this.data.moreData) {
      return
    }
    this.requestComments(false)
  },

  // 获取评价信息
  requestEvaluation: function () {
    let req = {
      id: this.id,
    }
    request.evaluationInfo(req, res => {
      if (res.code != 0) {
        console.warn('request.evaluationInfo error:', res)
        return
      }
      this.setData({
        evaluation: res.data,
      })
    })
  },

  // 获取评论列表
  requestComments: function (refresh=false) {
    this.req.page = refresh ? 0 : this.req.page + 1
    let req = {
      id: this.id,
      limit: this.req.limit,
      page: this.req.page,
    }

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)

    request.commentList(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.commentList error:', res)
        return
      }
      let data = res.data
      let list = this.data.comments
      if (refresh) {
        list = new Array
      }
      if (data.total == 0) {
        this.setData({
          moreData: false,
          comments: list,
        })
        return
      }
      list = list.concat(data.list)
      this.setData({
        moreData: true,
        comments: list,
      })
    })
  },

  // 发布评论
  bindPublish: function (e) {
    let value = e.detail.value
    let req = {
      id: 0,
      content: value,
      is_anonymous: false,
    }

    request.commentCreateOrUpdate(req, res => {
      if (res.code != 0) {
        console.warn('request.commentCreateOrUpdate error:', res)
        wx.showToast({
          title: '发布失败',
          icon: 'error',
          duration: 1500,
        })
        return
      }
      console.log('发布评论成功，evaluationID='+ this.id)
      wx.showToast({
        title: '发布成功',
        icon: 'error',
        duration: 1500,
      })
      // 重新刷新
      this.requestComments(true)
    })
  },

  // 点赞，kind=0为评价点赞，kind=1为评论点赞
  bindLike: function (e) {
    let kind = Number(e.currentTarget.dataset.kind)
    var req = {
      kind: kind,
    }
    if (kind == 0) {
      req.id = this.data.evaluation.id
      req.expected_status = !this.data.evaluation.has_liked
    } else {
      let idx = e.currentTarget.dataset.idx
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
        console.warn('request.like error: ', res)
        wx.showToast({
          title: '内部错误',
          icon: 'error',
          duration: 1500,
        })
        return
      }
      console.log('点赞完成；req:', req)

      // 评价点赞
      if (kind == 0) {
        let eva = this.data.evaluation
        eva.has_liked = req.expected_status
        eva.like_num = eva.has_liked ? eva.like_num+1 : eva.like_num-1
        this.setData({
          evaluation: eva,
        })
        return
      }

      // 回复点赞
      let comments = this.data.comments
      comments[idx].has_liked = req.expected_status
      comments[idx].like_num = req.expected_status ? comments[idx].like_num+1 : comments[idx].like_num-1
      this.setData({
        comments: comments,
      })
    })

  },

})