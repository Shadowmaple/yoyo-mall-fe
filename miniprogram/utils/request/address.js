const app = getApp()
const model = require("model.js")

const addressAdd = (req, callback) => {
  let url = model.BaseURL + model.Paths.address
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
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('addressAdd failed:', res)
    }
  })
}

const addressList = (req, callback) => {
  let url = model.BaseURL + model.Paths.address

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
      console.error('addressList failed:', res)
    }
  })
}

const addressDel = (req, callback) => {
  let url = model.BaseURL + model.Paths.address + '?id=' + req.id

  wx.request({
    url: url,
    method: 'DELETE',
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('addressDel failed:', res)
    }
  })
}

module.exports = {
  addressAdd,
  addressList,
  addressDel,
}