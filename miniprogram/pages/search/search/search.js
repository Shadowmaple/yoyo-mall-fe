// pages/search/search/search.js

const ProductSrc = '/pages/search/search_list/search_list'
const OrderSrc = '/pages/search/search_orders/search_orders'
const DefaultSrc = ProductSrc

Page({
  data: {
    src: DefaultSrc,
    histories: [],
  },

  onLoad: function (options) {
    console.info('-- search onload:', options)
    if (options == null) {
      return
    }
    // kind: 0->产品搜索，1->订单搜素
    let kind = Number(options.kind)
    if (kind == 1) {
      this.setData({
        src: OrderSrc,
      })
    }
  },

})