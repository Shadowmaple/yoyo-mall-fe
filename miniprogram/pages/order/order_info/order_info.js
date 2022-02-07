// pages/order/order_info/order_info.js
const request = require("../../../utils/request/order.js")

const exData = {
  "status": 0,
  "total_fee": 20.99, // 应付总金额
  "payment": 20.88, // 实付总金额
  "coupon": 0.11, // 优惠金额
  "freight": 0, // 运费
  "receive_name": "",
  "receive_tel": 101,
  "receive_addr": "",
  "order_code": "", // 订单编号
  "create_time": "2022-01-21 15:21:00",
  "pay_time": "2022-01-21 15:21:00",
  "deliver_time": "", // 发货时间
  "confirm_time": "", // 签收时间
  "product_num": 2,
  "products": [
      {
          "id": 1,
          "title": "",
          "author": "",
          "num": 1,
          "total_fee": 27.20,
          "price": 30,
          "cur_price": 27.20,
          "image": ""
      }
  ],
}

Page({
  data: {
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
})