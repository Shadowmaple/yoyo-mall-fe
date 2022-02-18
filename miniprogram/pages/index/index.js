// index.js
const mock = require("../../utils/mock-data/product")
const request = require('../../utils/request/product')
const banners = ['/images/banner/banner1.png', '/images/banner/banner2.png']


Page({
  data: {
    banners: banners,
    saleRanks: mock.ranks, // 图书畅销榜
    newBookRanks: mock.ranks, // 新书榜
    discountRanks: mock.ranks, // 优惠榜单
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
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // 请求排行榜

    // 请求图书列表
    this.requestProductList(true)
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

  requestProductList: function (refresh=false) {
    request.productList(this.reqParams, res => {
      if (res.code != 0) {
        console.warn('requestProductList error: ', res)
        return
      }
      let data = res.data.list
      let list = this.data.recommendList
      if (refresh) {
        list = new Array
      }
      list = list.concat(data)
      this.setData({
        recommendList: list,
      })
      this.reqParams.page = refresh ? 0 : this.reqParams.page + 1
    })
  },


  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
})
