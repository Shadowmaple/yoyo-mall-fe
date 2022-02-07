const app = getApp()
const model = require("model.js")

var orderCreate = (req, callback) => {
  let url = model.Paths.orderCreate

  let data = {
    'total_fee': req.totalFee,
    'payment': req.payment,
    'coupon': req.coupon,
    'freight': req.freight,
    'receive_name': req.receiveName,
    'receive_tel': req.receiveTel,
    'receive_addr': req.receiveAddr,
    'product_num': req.productNum,
    'products': req.list,
  }

  wx.request({
    url: url,
    method: "POST",
    header: {
      token: app.globalData.token,
    },
    timeout: 5000,
    data: data,
    success: res => {
      let resp = res.data
      if (resp.code != 0) {
        console.warn('orderCreate error:', resp)
        wx.showToast({
          title: '提交失败',
          icon: 'error',
          duration: 2000,
        })
        return
      }
      console.log('orderCreate ok：', resp.data)
      callback(resp)
    },
    fail: res => {
      console.error('orderCreate failed:', res)
      wx.showToast({
        title: '内部错误',
        icon: 'error',
        duration: 2000,
      })
    },
    complete: res => {
      wx.hideLoading()
    }
  })
}

// 订单状态修改
var orderUpdate = req => {
  let url = model.Paths.orderUpdate + "/" + req.id
  let data = {
    status: req.status,
  }

  wx.request({
    url: url,
    method: "PUT",
    header: {
      token: app.globalData.token,
      'content-type': 'application/json',
    },
    timeout: 5000,
    data: data,
    success: res => {
      let resp = res.data
      if (resp.code != 0) {
        console.warn('orderUpdate error:', reqsp)
        return
      }
      console.log('orderUpdate ok：', resp.data)
    },
    fail: res => {
      console.error('orderUpdate failed:', res)
    }
  })
}

module.exports = {
  orderCreate,
  orderUpdate,
}
