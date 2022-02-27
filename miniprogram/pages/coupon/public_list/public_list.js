// pages/coupon/public_list/public_list.js
const mock = require('../../../utils/mock-data/coupon')
const request = require('../../../utils/request/coupon')
const util = require('../../../utils/util')

Page({
  data: {
    moreData: true,
    list: mock.list,
  },
  req: {
    limit: 20,
    page: 0,
    cid: 0,
    cid2: 0,
  },

  onLoad: function (options) {
    this.requestList(true)
  },

  onReachBottom: function () {
    if (!this.data.moreData) {
      return
    }
    this.requestList(false)
  },

  // 请求列表
  requestList: function (refresh=false) {
    this.req.page = refresh ? 0 : this.req.page+1
    let req = this.req

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000);

    request.couponPublic(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.couponPublic error:', res)
        return
      }
      let data = res.data
      let list = refresh ? new Array : this.data.list
      if (data.total == 0) {
        this.setData({
          moreData: false,
          list: list,
        })
        return
      }
      for (let i in data.list) {
        let item = data.list[i]
        // 优惠券状态：0等待开抢，1已开抢，2已领取，3已抢完，4已结束（过了grab_end_time）
        let status = 1
        let now = util.getCurrentTime()
        if (item.has_grabbed) {
          status = 2
        } else if (item.remain <= 0) {
          status = 3
        } else if (util.parseTime(item.grab_end_time) <= now) {
          status = 4
        } else if (util.parseTime(item.grab_begin_time) > now) {
          status = 0
        }

        list.push({
          "id": item.id,
          "begin_time": item.begin_time,
          "end_time": item.end_time,
          "cid": item.cid,
          "cid2": item.cid2,
          "title": item.title,
          "discount": item.discount,
          "threshold": item.threshold,
          "kind": item.kind,
          "remain": item.remain,
          "is_public": item.is_public,
          "grab_begin_time": item.grab_begin_time,
          "grab_end_time": item.grab_end_time,
          "has_grabbed": item.has_grabbed, // 已领取
          'status': status,
        })
      }
      this.setData({
        moreData: true,
        list: list,
      })
    })
  },

  // 领取
  bindGrab: function (e) {
    let idx = e.currentTarget.dataset.idx
    let id = e.currentTarget.dataset.id

    // 不能领取
    if (this.data.list[idx].status != 1) {
      return
    }

    // 请求领取
    let req = {
      code: '',
      id: id,
    }
    request.couponGrab(req, res => {
      if (res.code != 0) {
        console.warn('request.couponGrab error:', res)
        return
      }
      console.log('优惠券领取成功；req=', req)
      wx.showToast({
        title: '领取成功',
        icon: "success",
        duration: 1500,
      })
      let list = this.data.list
      list[idx].status = 2
      this.setData({
        list: list,
      })
    })
  },
})