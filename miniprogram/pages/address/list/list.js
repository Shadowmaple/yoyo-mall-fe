// pages/address/list/list.js
const mock = require('../../../utils/mock-data/addr')
const request = require('../../../utils/request/address')

Page({
  data: {
    list: mock.addrList,
  },

  onLoad: function (options) {
    this.requestList()
  },
 
  onShow: function () {
    this.requestList()
  },

  requestList: function () {
    let req = {}
    request.addressList(req, res => {
      if (res.code != 0) {
        console.warn('request.addressList error: ', res)
        return
      }
      let list = res.data.list
      this.setData({
        list: list,
      })
    })
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
        let req = {
          id: id,
        }
        request.addressDel(req, res => {
          if (res.code != 0) {
            console.warn('request.addressDel error:', res)
            return
          }
          console.log('request.addressDel ok')
        })

        let list = this.data.list
        list.splice(idx, 1)
        this.setData({
          list: list,
        })
      },
    })
    
  },
})