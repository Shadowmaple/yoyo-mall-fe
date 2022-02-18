const app = getApp()
const model = require("model.js")

const like = (req, callback) => {
  let url = model.BaseURL + model.Paths.like

  wx.request({
    url: url,
    method: 'POST',
    data: req,
    header: {token: app.globalData.token},
    timeout: 2000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.like failed: ', res)
    }
  })
}

// 评价列表
const evaluationList = (req, callback) => {
  let url = model.BaseURL + model.Paths.evaluationList
  let data = {
    limit: req.limit,
    page: req.page,
    product_id: req.product_id,
  }

  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {token: app.globalData.token},
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.evaluationList failed: ', res)
    }
  })
}

// 评价发布或修改
const evaluationCreate = (req, callback) => {
  let url = model.BaseURL + model.Paths.evaluationCreate
  let data = req

  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {token: app.globalData.token},
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.evaluationCreate failed: ', res)
    }
  })
}

// 评价详情
const evaluationInfo = (req, callback) => {

}

// 评论列表
const commentList = (req, callback) => {
  let url = model.BaseURL + '/evaluation/info/' + req.id + '/comment'
  let data = {
    page: req.page,
    limit: req.limit,
  }

  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {token: app.globalData.token},
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.commentList failed: ', res)
    }
  })
}

// 评论发布或修改
const commentCreate = (req, callback) => {
  let url = model.BaseURL + '/evaluation/info/' + req.id + '/comment'
  let data = req.data

  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {token: app.globalData.token},
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.commentCreate failed: ', res)
    }
  })
}

module.exports = {
  like,
  evaluationList,
  evaluationCreate,
  evaluationInfo,
  commentList,
  commentCreate,
}