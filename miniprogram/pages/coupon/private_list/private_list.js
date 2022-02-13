// pages/coupon/private_list/private_list.js

const staticTab = ['未使用', '已使用', '已过期']

Page({
  data: {
    hasData: true,
    tabs: staticTab,
    tab: 0, // 当前选中的tab
    list: [{
      "id": 2,
      "begin_time": "2022-01-01 12:00:00",
      "end_time": "2022-01-31 12:00:00",
      "cid": 2,
      "cid2": 4,
      "title": "大额神券 满200减20",
      "discount": 20, // 立减金额
      "threshold": 200, // 门槛
  }],
  },

  onLoad: function (options) {

  },

  onPullDownRefresh: function () {

  },

  bindChangeTab: function (e) {
    let idx = e.currentTarget.dataset.idx
    if (idx == this.data.tab) {
      return
    }

    // 重新请求

    this.setData({
      tab: idx,
    })
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
    let url = '/pages/product/product_list/product_list'
    wx.redirectTo({
      url: url,
    })
  },
})