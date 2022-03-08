// pages/product/rank/rank.js
const mock = require('../../../utils/mock-data/product')
const request = require('../../../utils/request/product')
const rankKinds = [
  {name: '畅销榜', kind: 0}, {name: '新书榜', kind: 1}, {name: '优惠榜', kind: 2},
]

Page({
  data: {
    kind: 0,
    cid: 0,
    cid2: 0,
    rankKinds: rankKinds,
    // list: mock.ranks,
    list: [],
  },

  onLoad: function (options) {
    console.info('options: ', options)
    if (options == null) {
      return
    }
    let kind = options.kind
    this.setData({
      kind: kind,
    })
    this.requestRanks(true)
  },

  requestRanks: function (refresh=false) {
    let req = {
      kind: this.data.kind,
      cid: this.data.cid,
      cid2: this.data.cid2,
    }
    request.ranks(req, res => {
      if (res.code != 0) {
        console.warn('request.ranks error: ', res)
        return
      }
      if (res.data.total == 0) {
        return
      }
      let list = this.data.list
      if (refresh) {
        list = new Array
      }
      list = list.concat(res.data.list)
      this.setData({
        list: list,
      })
    })
  },

  // 更改榜单
  bindChangeKind: function (e) {
    let kind = e.currentTarget.dataset.kind
    this.setData({
      kind: kind,
    })
    this.requestRanks(true)
  },

  // 更改分类
  bindChangeCid: function (e) {
    let cid = e.currentTarget.dataset.cid
  },

  bindJumpInfo: function (e) {
    let id = e.currentTarget.dataset.id
    let url = '../product_info/product_info?id=' + id
    wx.navigateTo({
      url: url,
    })
  },
})