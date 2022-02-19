// pages/product/product_info/product_info.js
const mock = require("../../../utils/mock-data/product")
const request = require('../../../utils/request/product')
const addrRequest = require('../../../utils/request/address')
const cartRequest = require('../../../utils/request/cart')
const collRequest = require('../../../utils/request/collection')

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

    // 请求详情
    this.requestInfo()
    this.requestAddr()
  },

  requestInfo: function () {
    let req = {id: this.id}
    request.productInfo(req, res => {
      if (res.code != 0) {
        console.warn('request.productInfo error: ', res)
        return
      }
      let data = res.data
      this.setData({
        info: data,
      })
    })
  },

  // 获取默认地址
  requestAddr: function () {
    let req = {}
    addrRequest.addressList(req, res => {
      if (res.code != 0) {
        console.warn('addressList error: ', res)
        return
      }
      let data = res.data
      if (data.total == 0) {
        console.log('addressList is empty: ', data)
        return
      }
      let item = data.list[0]
      let addr = item.province + item.city + item.district + item.detail
      this.setData({
        addr: addr,
      })
    })
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
    let req = {
      list: [this.id],
    }
    let info = this.data.info
    // 取消收藏
    if (info.has_star) {
      collRequest.collectDel(req, res => {
        if (res.code != 0) {
          console.warn('collectionAdd error: ', res)
          return
        }
        info.has_star = false
        this.setData({
          info: info,
        })
      })
    } else {
      // 收藏
      collRequest.collectAdd(req, res => {
        if (res.code != 0) {
          console.warn('collectionAdd error: ', res)
          return
        }
        info.has_star = true
        this.setData({
          info: info,
        })
      })
    }
  },

  // 加入购物车
  bindAddToCart: function (e) {
    let req = {
      list: [{
        id: this.id,
        num: 1,
      }]
    }

    cartRequest.cartAdd(req, res => {
      if (res.code != 0) {
        console.warn('cartAdd error: ', res)
        return
      }
      let info = this.data.info
      info.has_in_cart = true
      info.cart_num++
      this.setData({
        info: info,
      })
    })
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

  // 跳转到购物车页面
  bindJumpToCart: function (e) {
    let url = '/pages/cart/cart'
    wx.switchTab({
      url: url,
    })
  },
})