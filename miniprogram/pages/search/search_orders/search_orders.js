// pages/search/search_orders/search_orders.js
const request = require('../../../utils/request/search')
const mock = require('../../../utils/mock-data/order')
// 状态：0->待付款，1->待发货，2->待收货，3->待评价，4->交易完成，5->交易取消，6->退货中，7->交易关闭
const staticStatusMp = ['待付款', '待发货', '待收货', '待评价', '交易完成', '交易取消', '退货中', '交易关闭']


Page({
  data: {
    statusMp: staticStatusMp,
    key: '',
    moreData: false,
    // list: mock.list,
    list: [],
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let key = options.value
    this.setData({
      key: key,
    })
    this.requestList()
  },

  // 分页暂时未做
  requestList: function () {
    let req = {
      key: this.data.key,
    }

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000)

    request.searchOrder(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.searchOrder error:', res)
        return
      }
      let data = res.data
      let list = data.list
      this.setData({
        list: list,
      })
    })
  },

  bindClickOrder: function (e) {
    let id = e.currentTarget.dataset.id
    let url = '/pages/order/order_info/order_info?id=' + id
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

    this.requestList()
  },
})