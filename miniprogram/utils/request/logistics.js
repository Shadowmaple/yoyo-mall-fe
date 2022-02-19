const app = getApp()
const model = require("model.js")

const logistics = (req, callback) => {
  let url = model.BaseURL + model.Paths.logistics + '?order_id=' + req.order_id

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.logistics failed: ', res)
    },
  })
}

module.exports = {
  logistics,
}