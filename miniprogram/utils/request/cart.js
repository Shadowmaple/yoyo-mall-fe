const app = getApp()
const model = require("model.js")

// 购物车-删除商品
var cartDel = (req, callback) => {
  let url = model.BaseURL + model.Paths.cartDel

  let data = {
    list: req.list,
  }

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
      if (resp.code != 0) {
        console.warn('cartDel error:', reqsp)
        return
      }
      console.log('cartDel ok：', resp.data)
      callback()
    },
    fail: res => {
      console.error('cartDel failed:', res)
    }
  })
}

module.exports = {
  cartDel
}
