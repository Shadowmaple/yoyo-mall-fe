// pages/cart/cart.js
const app = getApp()
const request = require("../../utils/request.js")

Page({
  data: {
    isEdit: false,
    selectAll: false,
    purchase: 0, // 当前需付费
    discount: 0, // 优惠金额
    cartList: [{
      'id': 1,
      'product_id': 42,
      'title': '落叶飘零',
      'author': '林则明',
      'price': '20.20',
      'cur_price': '18.50',
      'image': 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
      'num': 2,
      'selected': false,
      'isEdit': false, // 是否修改了数量
    }],
  },

  onLoad: function (options) {

    this.requestCart()
  },

  // 页面隐藏时保存商品数
  onHide: function () {

  },
  
  // 下拉刷新
  onPullDownRefresh: function() {

  },

  requestCart:function () {

  },

  // 编辑商品事件
  bindEdit: function (e) {
    this.setData({
      isEdit: !this.data.isEdit,
    })
  },

  // 全选事件
  bindSelectAll: function (e) {
    let selectAll = !this.data.selectAll
    let cartList = this.data.cartList
    let purchase = new Number(0), discount = new Number(0)
    for (let i in cartList) {
      cartList[i].selected = selectAll
      if (selectAll) {
        purchase += cartList[i].cur_price
        discount += cartList[i].price - cartList[i].cur_price
      }
    }

    this.setData({
      selectAll: selectAll,
      purchase: purchase.toFixed(2),
      discount: discount.toFixed(2),
      cartList: cartList,
    })
  },

  // 单选
  bindSelect: function(e) {
    let dataset = e.currentTarget.dataset
    let idx = Number(dataset.idx)
    let cartList = this.data.cartList
    // 更新该商品的选择状态
    cartList[idx].selected = !cartList[idx].selected
    // 更新付费金额和优惠金额数目
    let purchase = parseFloat(this.data.purchase)
    let discount = parseFloat(this.data.discount)
    if (cartList[idx].selected) {
      purchase += cartList[idx].cur_price
      discount += cartList[idx].price - cartList[idx].cur_price
    } else {
      purchase -= cartList[idx].cur_price
      discount -= cartList[idx].price - cartList[idx].cur_price
    }

    // 更新全选状态
    let flag = true
    let selectedNum = 0, unselectedNum = 0
    for (let i in cartList) {
      if (cartList[i].selected) {
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
      selectAll = selectedNum == cartList.length ? true : false
    }

    this.setData({
      selectAll: selectAll,
      purchase: purchase.toFixed(2),
      discount: discount.toFixed(2),
      cartList: cartList,
    })
  },

  // 改变数量
  bindChangeNum: function(e) {
    let num = e.detail.num
    let idx = e.currentTarget.dataset.idx
    let cartList = this.data.cartList
    cartList[idx].num = num
    cartList[idx].isEdit = true
    this.cartList = cartList
  },

  // 结算
  bindConfirm: function (e) {

  },

  // 批量移入收藏
  bindBatchMoveToCollect: function(e) {

  },

  // 批量删除
  bindBatchDel: function (e) {

  },
})