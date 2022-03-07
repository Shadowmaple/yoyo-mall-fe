// pages/coupon/private_list/private_list.js
const request = require('../../../utils/request/coupon')
const mock = require('../../../utils/mock-data/coupon')
const staticTab = ['未使用', '已使用', '已过期']

Page({
  data: {
    moreData: false,
    hasData: false,
    tabs: staticTab,
    tab: 0, // 当前选中的tab
    list: mock.privateList,
  },

  onLoad: function (options) {
    this.requestList()
  },

  onShow: function () {
    this.requestList()
  },

  onPullDownRefresh: function() {
    this.setData({
      tab: 0,
    })
    this.requestList()
  },

  // 请求列表
  requestList: function () {
    let req = {
      status: this.data.tab,
    }

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000);

    request.couponPrivate(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.couponPrivate error:', res)
        return
      }
      let list = new Array
      let data = res.data
      for (let i in data.list) {
        let item = data.list[i]
        list.push({
          "id": item.id,
          "begin_time": item.begin_time,
          "end_time": item.end_time,
          "cid": item.cid,
          "cid2": item.cid2,
          "title": item.title,
          "discount": item.discount, // 立减金额
          "threshold": item.threshold, // 门槛
        })
      }
      this.setData({
        hasData: true,
        list: list,
      })
    })
  },

  bindChangeTab: function (e) {
    let idx = e.currentTarget.dataset.idx
    if (idx == this.data.tab) {
      return
    }
    this.setData({
      tab: idx,
    })

    // 重新请求
    this.requestList()
  },

  // 兑换
  bindGrabByCode: function (e) {
    let url = "../code_grab/code_grab"
    wx.navigateTo({
      url: url,
    })
  },

  // 领取
  bindGrab: function (e) {
    let url = '../public_list/public_list'
    wx.navigateTo({
      url: url,
    })
  },

  // 去使用，
  // 暂时跳转到商品列表界面
  bindUse: function (e) {
    let idx = e.currentTarget.dataset.idx
    let item = this.data.list[idx]
    let url = '/pages/product/product_list/product_list'
    url += '?cid=' + item.cid + '&cid2=' + item.cid2

    wx.redirectTo({
      url: url,
    })
  },
})