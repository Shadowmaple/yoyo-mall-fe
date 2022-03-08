// index.js
const mock = require("../../utils/mock-data/product")
const request = require('../../utils/request/product')
const banners = ['/images/banner/banner1.png', '/images/banner/banner2.png']

Page({
  data: {
    banners: banners,
    // saleRanks: mock.ranks, 
    // newBookRanks: mock.ranks, 
    // discountRanks: mock.ranks, 
    saleRanks: [], // 图书畅销榜0
    newBookRanks: [], // 新书榜1
    discountRanks: [], // 优惠榜单2
    recommendList: [], // 推荐列表
  },
  reqParams: {
    limit: 20,
    page: 0,
    cid: 0,
    cid2: 0,
    sort: 0,
  },

  onLoad() {
    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
      // 请求排行榜
      this.requestRank(0)
      this.requestRank(1)
      this.requestRank(2)

      // 请求图书列表
      this.requestProductList(true)
    }, 2000)
  },

  onPullDownRefresh: function () {
    wx.showToast({
      title: '',
      icon: "loading",
      duration: 1000,
    })
    this.requestProductList(true)
  },

  onReachBottom: function () {
    wx.showToast({
      title: '',
      icon: "loading",
      duration: 1000,
    })
    this.requestProductList(false)
  },

  bindJumpToRank: function (e) {
    let kind = e.currentTarget.dataset.kind
    let url = '/pages/product/rank/rank?kind=' + kind
    wx.navigateTo({
      url: url,
    })
  },

  // 点击特定图书
  bindJumpToInfo: function (e) {
    let id = e.currentTarget.dataset.id
    console.info('---', id)
    let url = '/pages/product/product_info/product_info?id=' + id
    wx.navigateTo({
      url: url,
    })
  },

  // 请求单个榜单数据
  requestRank: function (kind) {
    let req = {
      kind: kind,
      cid: 0,
      cid2: 0,
    }
    request.ranks(req, res => {
      if (res.code != 0) {
        console.warn('requset.ranks error:', res)
        return
      }
      let list = res.data.list
      if (kind == 0) {
        this.setData({
          saleRanks: list,
        })
      } else if (kind == 1) {
        this.setData({
          newBookRanks: list,
        })
      } else if (kind == 2) {
        this.setData({
          discountRanks: list,
        })
      }
    })
  },

  // 请求推荐图书数据
  requestProductList: function (refresh = false) {
    this.reqParams.page = refresh ? 0 : this.reqParams.page + 1

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)

    request.productList(this.reqParams, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.productList error: ', res)
        return
      }
      let data = res.data.list
      let list = refresh ? new Array : this.data.recommendList
      list = list.concat(data)
      this.setData({
        recommendList: list,
      })
    })
  },
})