const app = getApp()
const model = require("model.js")

// 优惠券领取和兑换
const couponGrab = (req, callback) => {
  let url = ''

  wx.request({
    url: url,
    data: req,
    header: {
      token: app.globalData.token,
    },
    success: res => {
      callback(res)
    },
    fail: res => {
      console.error('request.conponGrab failed: ', res)
    }
  })
}

module.exports = {
  couponGrab
}
