// pages/order/order_info/order_info.js
const request = require("../../../utils/request/order.js")
// 状态：0->待付款，1->待发货，2->待收货，3->待评价，4->交易完成，5->交易取消，6->退货中，7->交易关闭
const staticStatusMp = ['等待付款', '等待商家发货', '商家已发货', '已完成', '已完成', '订单已关闭', '退货中', '订单已关闭']
const staticLogisMp = ['暂无物流信息', '等待发货', '已发货', '已签收', '已签收', '暂无物流信息', '退货中', '退货完成']

const exData = {
  "status": 0,
  "total_fee": 20.99, // 应付总金额
  "payment": 20.88, // 实付总金额
  "coupon": 0.11, // 优惠金额
  "freight": 0, // 运费
  "receive_name": "李明",
  "receive_tel": 101,
  "receive_addr": "湖北省武汉市洪山区雄楚大道382号华中师范大学",
  "order_code": "123213", // 订单编号
  "create_time": "2022-01-21 15:21:00",
  "pay_time": "2022-01-21 15:21:00",
  "deliver_time": "", // 发货时间
  "confirm_time": "", // 签收时间
  "product_num": 2,
  "products": [
      {
          "id": 1,
          "title": "生死看淡",
          "author": "",
          "num": 1,
          "total_fee": 27.20,
          "price": 30,
          "cur_price": 27.20,
          "image": "http://img3m5.ddimg.cn/37/23/29343835-1_l_18.jpg"
      }, {
        "id": 2,
        "title": "生死看淡",
        "author": "",
        "num": 1,
        "total_fee": 27.20,
        "price": 30,
        "cur_price": 27.20,
        "image": "http://img3m5.ddimg.cn/37/23/29343835-1_l_18.jpg"
    }
  ],
}

Page({
  data: {
    statusMp: staticStatusMp,
    logisticMp: staticLogisMp,
    info: exData,
  },
  orderID: 0,

  onLoad: function (options) {
    if (options == null) {
      return
    }
    this.orderID = options.orderID
    // 请求信息
    // ...
  },

  bindReceive: function (e) {

  },

  bindJumpToLogistics: function(e) {
    let url = '/pages/logistics/logistics?orderID=' + this.orderID
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

  bindCancelOrder: function (e) {

  },

  bindPay: function (e) {

  },

  // 再次购买，加入购物车
  bindBugAgain: function(e) {
    let id = e.currentTarget.dataset.id
    // todo
  },
})