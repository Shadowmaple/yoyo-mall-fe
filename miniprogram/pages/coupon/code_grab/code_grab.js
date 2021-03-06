// pages/coupon/code_grab/code_grab.js
const request = require('../../../utils/request/coupon')
const mock = require('../../../utils/mock-data/coupon')

Page({
  data: {
    code: "",
    showCoupon: false,
    coupon: {},
  },

  onLoad: function (options) {

  },

  bindInput: function (e) {
    this.data.code = e.detail.value
  },

  bindGrab: function (e) {
    let req = {
      code: this.data.code,
      id: 0,
    }

    request.couponGrab(req, res => {
      // todo: 不同错误类型，兑换码错误、失效、无剩余等等
      if (res.code != 0) {
        console.warn('request.couponGrab error:', res)
        let msg = '兑换失败' + res.msg
        if (res.code == 23001) {
          msg = '兑换码错误'
        } else if (res.code == 23002) {
          msg = '您已兑换过了'
        } else if (res.code == 23004) {
          msg = '优惠券不存在'
        }
        wx.showModal({
          showCancel: false,
          content: msg,
        })
        return
      }
      console.log('优惠券兑换成功; req=', req)
      let data = res.data
      let coupon = {
        id: data.id,
        begin_time: data.begin_time,
        end_time: data.end_time,
        cid: data.cid,
        cid2: data.cid2,
        title: data.title,
        discount: data.discount,
        threshold: data.threshold,
      }
      this.setData({
        code: "",
        showCoupon: true,
        coupon: coupon,
      })
    })
  },

  // 对话框确认
  bindConfirm: function (e) {
    this.setData({
      code: "",
      showCoupon: false,
      coupon: {},
    })
  },

  bindBack: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },
})