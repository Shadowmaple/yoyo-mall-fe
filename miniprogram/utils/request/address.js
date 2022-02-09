const app = getApp()
const model = require("model.js")

const addressAdd = (req, callback) => {
  let url = model.BaseURL + model.Paths.addrAdd

  let data = req

  wx.request({
    url: url,
    method: "POST",
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
      console.error('cartDel failed:', res)
    }
  })
}

const addressList = (req, callback) => {

}

module.exports = {
  addressAdd
}