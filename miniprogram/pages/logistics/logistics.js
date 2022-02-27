// pages/logistics/logistics.js
const mock = require('../../utils/mock-data/logistics')
const request = require('../../utils/request/logistics')

// status:
// 状态：0->待发货，1->已发货待收货，2->已完成，3->已取消，4->退货中，5->退货完成
// 另加：-1->无物流信息，即未付款

Page({
  data: {
    status: mock.logistics.status, // 当前物流状态
    list: mock.logistics.list,
  },
  orderID: 0,

  onLoad: function (options) {
    if (options == null) {
      return
    }
    this.orderID = Number(options.order_id)
    // 请求数据
    this.requestData()
  },

  requestData: function () {
    let req = {
      order_id: this.orderID,
    }

    request.logistics(req, res => {
      if (res.code != 0) {
        console.warn('request.logistics error: ', res)
        return
      }
      let data = res.data
      console.info('request.logistics ok; data:', data)
      let status = -1
      if (data.total > 0) {
        status = data.list[data.total-1].status
      }
      this.setData({
        status: status,
        list: data.list,
      })
      console.info('---', this.data)
    })
  },
})