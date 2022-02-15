// pages/search/search_list/search_list.js
const request = require('../../../utils/request/search')
const mock = require('../../../utils/mock-data/search')

Page({
  data: {
    key: '略略略',
    moreData: false,
    list: mock.productList,
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let key = options.value
    this.setData({
      key: key,
    })

    this.requestList(key)
  },

  // todo 搜素
  requestList: function (key) {
    let req = {
      key: key
    }

    wx.showLoading()
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '内部错误',
        icon: 'error',
        duration: 1000,
      })
    }, 2000)

    request.searchProduct(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        return
      }

    })
  },

  bindJumpInfo: function (e) {
    let id = e.currentTarget.dataset.id
    let url = '/pages/product/product_info/product_info?id=' + id
    wx.navigateTo({
      url: url,
    })
  },

  // 搜索框搜索
  bindSearch: function (e) {
    let value = e.detail.value
    console.info('--', value)

    this.requestList(value)
  }
})