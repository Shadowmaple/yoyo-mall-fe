// pages/search/search/search.js
const ProductSrc = '/pages/search/search_list/search_list'
const OrderSrc = '/pages/search/search_orders/search_orders'
const DefaultSrc = ProductSrc

Page({
  data: {
    kind: 0, // 0->商品搜素，1->订单搜素
    src: DefaultSrc,
    histories: [],
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    // kind: 0->产品搜索，1->订单搜素
    let kind = Number(options.kind)
    this.setData({
      kind: kind,
      src: kind == 1 ? OrderSrc : ProductSrc,
    })
    // this.getHistory()
  },

  // getStoreKey: function () {
  //   switch (this.kind) {
  //     case 0: return 'search-history-p'
  //     case 1: return 'search-history-o'
  //   }
  //   return ''
  // },

  // getHistory: function () {
  //   let key = this.getStoreKey()
  //   if (key == '') {
  //     return
  //   }
  //   let value = wx.getStorageSync(key)
  //   if (value == null || value === '') {
  //     return
  //   }
  //   let list = JSON.parse(value)
  //   this.setData({
  //     histories: list,
  //   })
  // },
})