// pages/coupon/public_list/public_list.js
Page({
  data: {
    hasData: true,
    list: [{
      "id": 2,
      "begin_time": "",
      "end_time": "",
      "cid": 2,
      "cid2": 4,
      "title": "大额优惠 满200减20",
      "discount": 20,
      "threshold": 200,
      "kind": 0,
      "remain": 200,
      "is_public": true,
      "grab_begin_time": "2022-01-01 12:00:00",
      "grab_end_time": "2022-01-31 12:00:00",
      "has_grabbed": true, // 已领取
      'status': 1, // 0等待开抢，1已开抢，2已领取，3已抢完，4已结束（过了grab_end_time）
    }]
  },

  onLoad: function (options) {

  },

  // 领取
  bindGrab: function (e) {
    let idx = e.currentTarget.dataset.idx
    let id = e.currentTarget.dataset.id

    // todo: 请求领取

    wx.showToast({
      title: '领取成功',
      icon: "success",
      duration: 1000,
    })

    let list = this.data.list
    list[idx].status = 2
    this.setData({
      list: list,
    })
  },
})