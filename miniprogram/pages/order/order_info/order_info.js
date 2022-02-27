// pages/order/order_info/order_info.js
const request = require("../../../utils/request/order.js")
const cartRequest = require('../../../utils/request/cart')
const mock = require('../../../utils/mock-data/order')
// 状态：0->待付款，1->待发货，2->待收货，3->待评价，4->交易完成，5->交易取消，6->退货中，7->交易关闭
const staticStatusMp = ['等待付款', '等待商家发货', '商家已发货', '已完成', '已完成', '订单已关闭', '退货中', '订单已关闭']
const staticLogisMp = ['暂无物流信息', '等待发货', '已发货', '已签收', '已签收', '暂无物流信息', '退货中', '退货完成']


Page({
  data: {
    statusMp: staticStatusMp,
    logisticMp: staticLogisMp,
    info: mock.orderInfo,
  },
  orderID: 0,

  onLoad: function (options) {
    if (options == null) {
      return
    }
    this.orderID = options.id
    // 请求信息
    this.requestInfo()
  },

  requestInfo: function () {
    if (this.orderID == null || this.orderID == 0) {
      return
    }
    let req = {
      id: Number(this.orderID),
    }
    request.orderInfo(req, res => {
      if (res.code != 0) {
        console.warn('request.orderInfo error: ', res)
        return
      }
      this.setData({
        info: res.data,
      })
    })
  },

  // 点击收货
  bindReceive: function (e) {
    // 当前是待收货状态
    if (status == 2) {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '收获确认',
        content: '确认收货？',
        success: res => {
          if (res.confirm) {
            this.doReceive()
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
            this.doReceive()
          }
        }
      })
    }
  },

  doReceive: function () {
    let req = {
      id: Number(this.orderID),
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
          this.requestInfo()
        }
      })
    })
  },

  bindJumpToLogistics: function(e) {
    let url = '/pages/logistics/logistics?order_id=' + this.orderID
    wx.navigateTo({
      url: url,
    }) 
  },

  bindEvaluate: function (e) {
    let url = "../evaluate/evaluate?order_id=" + this.orderID
    wx.navigateTo({
      url: url,
    })
  },

  // 取消订单
  bindCancelOrder: function (e) {
    let req = {
      id: this.orderID,
      status: 5,
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
      console.log('订单取消成功: ', req.id)
      wx.showModal({
        content: '订单已取消',
        success: res => {
          // 刷新数据
          this.requestInfo()
        }
      })
    })
  },

  // 立即支付
  bindPay: function (e) {
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
          id: Number(this.orderID),
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

  // 再次购买，加入购物车
  bindBugAgain: function(e) {
    let list = new Array
    for (let i in this.data.info.products) {
      let item = this.data.info.products[i]
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