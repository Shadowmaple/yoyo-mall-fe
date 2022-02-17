// pages/product/product_info/product_info.js
const mock = require("../../../utils/mock-data/mock")

Page({
  data: {
    info: mock.productInfo,
    addr: '湖北省武汉市洪山区雄楚大道382号华中师范大学',
    freight: 10,
  },
  id: 0, // product_id

  onLoad: function (options) {
    if (options == null) {
      return
    }
    this.id = options.id
    // 请求 ...
  },

  bindBack: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },

  bindToHome: function (e) {
    let url = '/pages/index/index'
    wx.switchTab({
      url: url,
    })
  },

  // 收藏
  bindStar: function (e) {

  },

  // 加入购物车
  bindAddToCart: function (e) {

  },

  // 跳转到评论页面
  bindEvaluationPage: function(e) {
    let url = '../evaluations/evaluations'
    wx.navigateTo({
      url: url,
    })
  },

  // 更改地址，计算运费
  bindChangeAddr: function (e) {

  },

  // 立即购买，跳转到订单确认页面
  bindBuy: function (e) {
    let info = this.data.info
    let confirmData = {
      'purchase': info.cur_price,
      'discount': info.price - info.cur_price,
      'list': [{
        'id': 0,
        'product_id': info.id,
        'title': info.title,
        'price': info.price,
        'cur_price': info.cur_price,
        'image': info.images[0],
        'num': 1,
      }],
    }
    let url = '/pages/order/order_confirm/order_confirm?data=' + JSON.stringify(confirmData)
    wx.navigateTo({
      url: url,
    })
  },

  // 加入购物车并跳转到购物车页面
  bindJumpToCart: function (e) {
    // ... 加入购物车
    // todo

    let url = '/pages/cart/cart'
    wx.switchTab({
      url: url,
    })
  },
})