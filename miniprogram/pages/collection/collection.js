// pages/collection/collection.js
const request = require('../../utils/request/collection')
const mock = require('../../utils/mock-data/collection')

Page({
  data: {
    hasData: true,
    isEdit: false,
    selectAll: false,
    // list: mock.list,
    list: [],
  },
  req: {
    limit: 20,
    page: 0,
  },

  onLoad: function (options) {
    this.requestList(true)
  },

  onPullDownRefresh: function () {
    this.requestList(true)
  },

  requestList: function (refresh) {
    this.req.page = refresh ? 0 : this.req.page+1
    let req = this.req

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 2000);

    request.collectList(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.collectionList error:', res)
        return
      }
      console.log('request.collectionList ok:', res)
      let data = res.data
      let list = refresh ? new Array : this.data.list
      list = list.concat(data.list)
      this.setData({
        hasData: true,
        list: list,
      })
    })
  },

  bindEdit: function (e) {
    this.setData({
      isEdit: !this.data.isEdit,
    })
  },

  bindDel: function (e) {
    let delList = new Array
    let list = this.data.list
    let curList = new Array
    for (let i in list) {
      if (list[i].selected) {
        delList.push(list[i].id)
      } else {
        curList.push(list)
      }
    }

    let req = {list: delList}

    // todo 请求删除
    request.collectDel(req, res => {

    })

    this.setData({
      isEdit: false,
      selectAll: false,
      list: curList,
    })
  },

  bindSelect: function (e) {
    let idx = Number(e.currentTarget.dataset.idx)
    let list = this.data.list
    // 更新该商品的选择状态
    list[idx].selected = !list[idx].selected

    // 更新全选状态
    let flag = true
    let selectedNum = 0, unselectedNum = 0
    for (let i in list) {
      if (list[i].selected) {
        selectedNum++
      } else {
        unselectedNum++
      }
      if (selectedNum > 0 && unselectedNum > 0) {
        flag = false
        break
      }
    }
    let selectAll = this.data.selectAll
    if (flag) {
      selectAll = selectedNum == list.length ? true : false
    }

    this.setData({
      selectAll: selectAll,
      list: list,
    })
  },

  bindSelectAll: function (e) {
    let selectAll = !this.data.selectAll
    let list = this.data.list
    for (let i in list) {
      list[i].selected = selectAll
    }

    this.setData({
      selectAll: selectAll,
      list: list,
    })
  },

  bindJumpInfo: function(e) {
    let id = e.currentTarget.dataset.product
    let url = '/pages/product/product_info/product_info?id=' + id
    wx.navigateTo({
      url: url,
    })
  },
})