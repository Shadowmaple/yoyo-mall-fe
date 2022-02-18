const app = getApp()
const model = require("model.js")

const cartList = (req, callback) => {
  let url = model.BaseURL + model.Paths.cart

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    success: res => {
      let resp = res.data
      callback(res)
    },
    fail: res => {
      console.error('request.cartList failed: ', res)
    }
  })
}

const cartAdd = (req, callback) => {
  let url = model.BaseURL + model.Paths.cart
  let data = {
    list: req.list,
  }

  wx.request({
    url: url,
    method: 'POST',
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
      console.error('request.cartAdd failed:', res)
    }
  })
}

const cartUpdate = (req, callback) => {
  let url = model.BaseURL + model.Paths.cart

  let data = {
    list: req.list,
  }

  wx.request({
    url: url,
    method: 'PUT',
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
      console.error('request.cartUpdate failed:', res)
    }
  })
}

// 购物车-删除商品
const cartDel = (req, callback) => {
  let url = model.BaseURL + model.Paths.cart

  let data = {
    list: req.list,
  }

  wx.request({
    url: url,
    method: 'DELETE',
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
      console.error('cartDel failed:', res)
    }
  })
}

module.exports = {
  cartList,
  cartAdd,
  cartUpdate,
  cartDel,
}
