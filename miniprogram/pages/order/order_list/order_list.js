// pages/order/order_list/order_list.js
const request = require("../../../utils/request/order.js")
const mock = require("../../../utils/mock-data/order")
const staticTabs = [{
  id: 0,
  name: '全部订单'
}, {
  id: 1,
  name: '待付款'
}, {
  id: 3,
  name: '待收货'
}, {
  id: 4,
  name: '待收货'
}, {
  id: 5,
  name: '退款/售后'
}]
// 状态：0->待付款，1->待发货，2->待收货，3->待评价，4->交易完成，5->交易取消，6->退货中，7->交易关闭
const staticStatusMp = ['待付款', '待发货', '待收货', '待评价', '交易完成', '交易取消', '退货中', '交易关闭']

Page({
  data: {
    tabs: staticTabs,
    tab: 0, // 0全部订单，1待付款，2待发货，3待收货，4待评价，5退款/售后
    statusMp: staticStatusMp,
    list: mock.list,
  },
  req: {
    limit: 5,
    page: 0,
  },

  onLoad: function (options) {
    console.info('orderList onLoad: ', options)
    if (options == null) {
      return
    }
    let tab = options.kind
    this.setData({
      tab: tab,
    })
    this.requestList(true)
  },

  onReachBottom: function () {
    this.requestList(false)
  },

  requestList: function (refresh) {
    if (refresh) {
      this.req.page = 0
    }
    let req = {
      limit: this.req.limit,
      page: this.req.page,
      kind: this.data.tab,
    }
    this.req.page++

    request.orderList(req, res => {
      if (res.code != 0) {
        console.warn('request.orderList error: ', res)
        return
      }
      let list = this.data.list
      if (refresh) {
        list = new Array
      }
      list = list.concat(res.data.list)
      this.setData({
        list: list,
      })
    })

  },

  // 切换tab
  bindSwitchTab: function (e) {
    let kind = e.currentTarget.dataset.kind
    this.setData({
      tab: kind,
    })
    this.requestList(true)
  },

  // 跳转到特定订单详情页
  bindClickOrder: function (e) {
    let id = e.currentTarget.dataset.id
    let url = "/pages/order/order_info/order_info?id=" + id
    wx.navigateTo({
      url: url,
    })
  },

  // 点击立即支付
  bindPay: function (e) {
    let id = e.currentTarget.dataset.id
  },

  // 点击确认收货
  bindReceive: function (e) {
    let id = e.currentTarget.dataset.id
  },

  // 查看物流详情
  bindGetLogistics: function (e) {
    let id = e.currentTarget.dataset.id

    let url = "/pages/logistics/logistics?order_id=" + id
    wx.navigateTo({
      url: url,
    })
  },

  // 点击评价
  bindEvaluate: function(e) {
    let id = e.currentTarget.dataset.id

    let url = "../evaluate/evaluate?order_id=" + id
    wx.navigateTo({
      url: url,
    })
  },

  // 再次购买，加入购物车
  bindBugAgain: function (e) {
    let id = e.currentTarget.dataset.id
    // todo
    
  },
})
