// pages/address/list/list.js
const mock = require('../../../utils/mock-data/addr')

Page({
  data: {
    list: mock.addrList,
  },

  onLoad: function (options) {
    
  },
 
  onShow: function () {
    // 请求地址
    // ...
  },

  bindOp: function (e) {
    let id = e.currentTarget.dataset.id
    let idx = e.currentTarget.dataset.idx

    wx.showActionSheet({
      itemList: ['编辑','删除'],
      success: res => {
        console.info('--', res.tapIndex)
        let tap = res.tapIndex
        switch (tap) {
          case 0: this.edit(idx, id); break;
          case 1: this.del(idx, id); break;
        }
      },
    })
  },

  edit: function (idx, id) {
    let data = this.data.list[idx]

    let url = '../add/add?data=' + JSON.stringify(data)
    wx.navigateTo({
      url: url,
    })
  },

  bindAdd: function (e) {
    let url = '../add/add'
    wx.navigateTo({
      url: url,
    })
  },

  del: function (idx, id) {
    wx.showModal({
      content: '确认删除？',
      success: res => {
        if (!res.confirm) {
          return
        }
        // 请求删除
        // todo

        let list = this.data.list
        list.splice(idx, 1)
        this.setData({
          list: list,
        })
      },
    })
    
  },
})