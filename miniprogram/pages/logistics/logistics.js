// pages/logistics/logistics.js
const mock = require('../../utils/mock-data/logistics')
const request = require('../../utils/request/logistics')

Page({
  data: {
    status: mock.logistics.status,
    list: mock.logistics.list,
  },
  orderID: 0,

  onLoad: function (options) {
    if (options == null) {
      return
    }
    console.info('---', this.data.list)
    let orderID = options.order_id
    this.orderID = orderID
    // 请求数据
    let req = {
      order_id: orderID,
    }
    request.logistics(req, res => {
      if (res.code != 0) {
        console.warn('request.logistics error: ', res)
        return
      }
      let data = res.data
      this.setData({
        status: data.status,
        list: data.list,
      })
    })
  },
})