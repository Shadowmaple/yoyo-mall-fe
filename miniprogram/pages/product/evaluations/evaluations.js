// pages/product/evaluations/evaluations.js
const mock = require('../../../utils/mock-data/comment')

Page({
  data: {
    list: mock.evaluationList,
  },

  onLoad: function (options) {

  },

  bindJumpInfo: function (e) {
    let id = e.currentTarget.dataset.id
    let idx = e.currentTarget.dataset.idx
    let data = JSON.stringify(this.data.list[idx])
    console.info('-- parse', data)

    // todo: json字符串过长会被截取，解决办法：传id，新页面再请求详情信息
    let url = "../evaluation_info/evaluation_info?data=" + data
    wx.navigateTo({
      url: url,
    })
  },

  bindLike: function (e) {
    let idx = e.currentTarget.dataset.idx

  },
})