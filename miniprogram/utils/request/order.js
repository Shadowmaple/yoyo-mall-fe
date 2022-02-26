const app = getApp()
const model = require("model.js")

const orderList = (req, callback) => {
  let url = model.BaseURL + model.Paths.orderList
  let data = {
    limit: req.limit,
    page: req.page,
    kind: req.kind,
  }

  wx.request({
    url: url,
    method: "GET",
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    data: data,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('orderList failed:', res)
    },
  })
}

const orderInfo = (req, callback) => {
  let url = model.BaseURL + model.Paths.orderInfo + req.id

  wx.request({
    url: url,
    method: "GET",
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('orderInfo failed:', res)
    },
  })
}

const orderCreate = (req, callback) => {
  let url = model.BaseURL + model.Paths.orderCreate

  let data = req

  wx.request({
    url: url,
    method: "POST",
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    data: data,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('orderCreate failed:', res)
      wx.showToast({
        title: '内部错误',
        icon: 'error',
        duration: 2000,
      })
    }
  })
}

// 订单状态修改
const orderUpdate = (req, callback) => {
  let url = model.BaseURL + model.Paths.orderUpdate + req.id
  let data = {
    status: req.status,
  }

  wx.request({
    url: url,
    method: "PUT",
    header: {
      token: app.globalData.token,
      'content-type': 'application/json',
    },
    timeout: 3000,
    data: data,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('orderUpdate failed:', res)
    }
  })
}

module.exports = {
  orderList,
  orderInfo,
  orderCreate,
  orderUpdate,
}
