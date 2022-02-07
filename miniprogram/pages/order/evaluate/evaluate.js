// pages/order/evaluate/evaluate.js
Page({
  data: {
    content: '',
    pictures: [],
    level: 0, // 0好评，1一般，2差评
    score: 0, // 评分，1-10
    isAnonymous: false,
  },
  orderID: 0,

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let orderID = options.order_id
    this.orderID = orderID
  },

  bindSwitchAnonymous: function(e) {
    this.setData({
      isAnonymous: !this.data.isAnonymous,
    })
  },

  bindScore: function (e) {

  },

  bindLevel: function (e) {
    let level = e.currentTarget.dataset.level
    this.setData({
      level: level,
    })
  },

  bindInput: function (e) {
    let value = e.detail.value
    this.data.content = value
  },

  // 请求发起评价
  // 成功后返回上一页
  bindEvaluate: function (e) {
    if (this.orderID <= 0) {
      return
    }
    // todo

    wx.showToast({
      title: '评价成功',
      icon: 'success',
      duration: 2000,
    })
    wx.navigateBack({
      delta: 0,
    })
  },

  bindUploadPic: function (e) {

  },
})