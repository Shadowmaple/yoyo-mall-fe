// pages/order/order_list/order_list.js
const request = require("../../../utils/request/order.js")
const cartRequest = require('../../../utils/request/cart')
const mock = require("../../../utils/mock-data/order")
const staticTabs = [{
  id: 0,
  name: '全部'
}, {
  id: 1,
  name: '待付款'
}, {
  id: 2,
  name: '待发货'
}, {
  id: 3,
  name: '待收货'
}, {
  id: 4,
  name: '待评价'
}]
// 状态：0->待付款，1->待发货，2->待收货，3->待评价，4->交易完成，5->交易取消，6->退货中，7->交易关闭
const staticStatusMp = ['待付款', '待发货', '待收货', '待评价', '交易完成', '交易取消', '退货中', '交易关闭']

Page({
  data: {
    tabs: staticTabs,
    tab: 0, // 0全部订单，1待付款，2待发货，3待收货，4待评价，5退款/售后
    statusMp: staticStatusMp,
    // list: mock.list,
    list: [],
    moreData: true, // 是否能下拉加载更多数据
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
    let tab = Number(options.kind)
    this.setData({
      tab: tab,
    })
    this.requestList(true)
  },

  onShow: function() {
    this.requestList(true)
  },

  onPullDownRefresh: function () {
    this.req.page = 0
    this.requestList(true)
  },

  onReachBottom: function () {
    if (!this.data.moreData) {
      return
    }
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

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)

    request.orderList(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.orderList error: ', res)
        return
      }
      // 没有更多数据了
      if (res.data.total == 0) {
        this.setData({
          moreData: false,
        })
        if (refresh) {
          this.setData({
            list: [],
          })
        }
        return
      }

      let list = this.data.list
      if (refresh) {
        list = new Array
      }
      list = list.concat(res.data.list)
      this.setData({
        list: list,
        moreData: true,
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
    // 支付确认弹窗，确认支付则发起更改订单状态的请求
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '支付',
      content: '确定支付 ' + this.data.purchase + ' 元？',
      success: res => {
        // 取消支付
        if (!res.confirm) {
          console.log('用户点击取消')
        }
        // 确定支付
        console.log('用户点击确定')
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })

        let req = {
          id: Number(id),
          status: 1,
        }
        // 改变订单状态为已支付
        request.orderUpdate(req, res => {
          if (res.code != 0) {
            console.warn('request.orderUpdate error:', res)
            return
          }
          console.log('订单付款完成：', req.id)
          // 重新刷新
          this.requestInfo()
        })
      }
    })
  },

  // 点击确认收货
  bindReceive: function (e) {
    let idx = e.currentTarget.dataset.idx
    let id = e.currentTarget.dataset.id
    let status = this.data.list[idx].status

    // 当前是待收货状态
    if (status == 2) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '收获确认',
        content: '确认收货？',
        success: res => {
          if (res.confirm) {
            this.doReceive(id)
          }
        }
      })

    } else if (status == 1) {
      // 未发货时点击收获，弹窗提醒

      wx.showModal({
        cancelColor: 'cancelColor',
        title: '收获确认',
        content: '订单未发货，确认收货吗？',
        success: res => {
          if (res.confirm) {
            this.doReceive(id)
          }
        }
      })
    }
  },

  // 发起收获请求
  doReceive: function (id) {
    let req = {
      id: Number(id),
      status: 3,
    }

    request.orderUpdate(req, res => {
      if (res.code != 0) {
        console.warn('request.orderUpdate error:', res)
        wx.showToast({
          title: '内部错误',
          icon: 'error',
          duration: 2000,
        })
        return
      }
      console.log('收货成功: ', req.id)
      wx.showModal({
        content: '收货成功',
        success: res => {
          // 刷新数据
          this.requestList(true)
        }
      })
    })
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
    let idx = e.currentTarget.dataset.idx
    let list = new Array
    for (let i in this.data.list[idx].products) {
      let item = this.data.list[idx].products[i]
      list.push({
        id: Number(item.id),
        num: item.num,
      })
    }
    let req = {list: list}

    cartRequest.cartAdd(req, res => {
      if (res.code != 0) {
        console.warn('cartAdd error: ', res)
        wx.showToast({
          title: '内部错误',
          icon: 'error',
          duration: 1000,
        })
        return
      }
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1000,
      })
    })
  },
})
