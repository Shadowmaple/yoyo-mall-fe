const app = getApp()

// pages/category/category.js
Page({
  data: {
    cateList: [],
    selectData: {
      index: 0,
      id: 1,
    },
  },

  onLoad: function (options) {
    this.setData({
      cateList: app.globalData.category,
    })
  },

  clickSelectCid: function (e) {
    let dataset = e.currentTarget.dataset
    let index = dataset.index
    let id = dataset.id
    if (index < 0 || id <= 0) {
      console.error('clickSelectCid error: ', dataset)
      return
    }
    this.setData({
      selectData: {
        index: index,
        id: id,
      }
    })
  },

  clickSelectCid2: function (e) {
    let dataset = e.currentTarget.dataset
    console.log(e)
    let cid = this.data.selectData.id
    let item = dataset.item
    if (item == null) {
      console.error('clickSelectCid2 error: item is null; e:', e.target)
      return
    }
    console.log(item)
    let cid2 = item.id
    let name = item.name
    let url = '../product/product_list/product_list?cid=' +
      cid + '&cid2=' + cid2 + '&name=' + name
    wx.navigateTo({
      url: url,
    })
  },
})