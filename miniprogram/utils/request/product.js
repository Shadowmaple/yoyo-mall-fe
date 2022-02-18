const app = getApp()
const model = require("model.js")

var productList = (req, callback) => {
  let url = model.BaseURL + model.Paths.productList

  let data = {
    limit: req.limit,
    page: req.page,
    cid: req.cid,
    cid2: req.cid2,
    sort: req.sort,
  }

  wx.request({
    url: url,
    method: "GET",
    header: {
      token: app.globalData.token,
    },
    timeout: 5000,
    data: data,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('requestProductList failed:', res)
    },
  })
}

const productInfo = (req, callback) => {
  let url = model.BaseURL + model.Paths.productInfo + req.id
  let data = {
    comment_limit: 2
  }

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    data: data,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('request.productInfo failed: ', res)
    },
  })
}

const ranks = (req, callback) => {
  let url = model.BaseURL + model.Paths.productRank
  let data = {
    kind: req.kind || 0,
    cid: req.cid || 0,
    cid2: req.cid2 || 0,
  }

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    data: data,
    success: res => {
      let resp = res.data
      callback(res)
    },
    fail: res => {
      console.error('request.ranks failed: ', res)
    }
  })
}

module.exports = {
  productList,
  productInfo,
  ranks,
}