// pages/order/order_confirm/order_confirm.js
Page({
  data: {
    address: {
      name: '李明',
      tel: '17396120043',
      detail: '湖北省武汉市洪山区雄楚大道382号',
    },
    productNum: 0,
    // 商品列表
    list: [],
    purchase: 0,
    discount: 0,
    freight: 0,
  },

  onLoad: function (options) {
    let data = JSON.parse(options.data)
    let purchase = parseFloat(data.purchase) // 需付款金额
    let discount = parseFloat(data.discount) // 促销优惠金额
    let list = data.list
    this.setData({
      productNum: list.length,
      list: list,
      purchase: purchase,
      discount: discount,
    })
    console.log('onLoad:', list)
  },

  // 更改地址
  bindChangeAddr: function(e) {

  },

  // 提交订单
  bindConfirm: function(e) {

  },

  // 选择优惠券
  bindChooseCoupon: function(e) {

  },
})