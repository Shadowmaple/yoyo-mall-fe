// pages/search/search_list/search_list.js
const request = require('../../../utils/request/search')
const mock = require('../../../utils/mock-data/search')

Page({
  data: {
    key: '',
    moreData: true,
    // list: mock.productList,
    list: [],
  },
  req: {
    limit: 5,
    page: 0,
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let key = options.value
    this.setData({
      key: key,
    })

    this.requestList(true)
  },

  onReachBottom: function () {
    if (!this.data.moreData) {
      return
    }
    this.requestList(false)
  },

  // 商品搜素
  requestList: function (refresh=false) {
    if (!this.data.moreData) {
      return
    }
    this.req.page = refresh ? 0 : this.req.page + 1
    let req = {
      title: this.data.key,
      limit: this.req.limit,
      page: this.req.page,
    }

    wx.showLoading()
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    request.searchProduct(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.searchProduct error:', res)
        wx.showToast({
          title: '内部错误',
          icon: 'error',
          duration: 1000,
        })
        return
      }
      let data = res.data
      let list = this.data.list
      if (refresh) {
        list = new Array
      }
      if (data.total == 0) {
        this.setData({
          moreData: false,
          list: list,
        })
        return
      }
      list = list.concat(data.list)
      this.setData({
        moreData: true,
        list: list,
      })
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
    this.setData({
      key: value,
    })

    console.log('search:', value)
    this.requestList(true)
  }
})