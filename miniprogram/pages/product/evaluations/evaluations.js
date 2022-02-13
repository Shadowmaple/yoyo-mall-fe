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

    let url = "../evaluation_info/evaluation_info?data=" + data
    wx.navigateTo({
      url: url,
    })
  },

  bindLike: function (e) {
    let idx = e.currentTarget.dataset.idx

  },
})