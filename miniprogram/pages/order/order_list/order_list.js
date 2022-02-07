// pages/order/order_list/order_list.js
const request = require("../../../utils/request/order.js")
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

const exList = [{
  id: 2,
  image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  totalFee: 20.99,
  status: 0,
  productNum: 1,
  title: '落叶飘风等',
  products: [{
    id: 23,
    title: '落叶飘风',
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }]
}, {
  id: 3,
  image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  totalFee: 20.99,
  status: 3,
  productNum: 2,
  title: '落叶飘风等',
  products: [{
    id: 23,
    title: '落叶飘风',
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }, {
    id: 231,
    title: '落叶飘风',
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }, {
    id: 2312,
    title: '落叶飘风',
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }]
}]


Page({
  data: {
    tabs: staticTabs,
    tab: 0, // 0全部订单，1待付款，2待发货，3待收货，4待评价，5退款/售后
    statusMp: staticStatusMp,
    list: exList,
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let tab = options.kind
    this.setData({
      tab: tab,
    })
  },

  onReachBottom: function () {

  },

  // 切换tab
  bindSwitchTab: function (e) {
    let kind = e.currentTarget.dataset.kind
    // todo: 重新请求
    // 。。。
    this.setData({
      tab: kind,
    })
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
