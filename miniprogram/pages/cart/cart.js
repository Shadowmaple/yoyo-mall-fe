// pages/cart/cart.js
const app = getApp()
const request = require("../../utils/request.js")

Page({
  data: {
    isEdit: false,
    selectAll: false,
    selectNum: 0,
    purchase: '0', // 商品总金额
    discount: '0', // 商品促销优惠金额
    cartList: [{
      'id': 1,
      'product_id': 42,
      'title': '落叶飘零',
      'author': '林则明',
      'price': 20.20,
      'cur_price': 18.50,
      'image': 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
      'num': 2,
      'selected': false,
      'isEdit': false, // 是否修改了数量
    }],
  },

  onLoad: function (options) {

    this.requestCart()
  },

  // 页面切回来展示时刷新数据
  onShow: function () {
    this.requestCart()
  },

  // 页面隐藏时保存商品数
  onHide: function () {

  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this.requestCart()
  },

  // 请求购物车数据
  requestCart: function () {

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
    let purchase = new Number(0),
      discount = new Number(0)
    for (let i in cartList) {
      cartList[i].selected = selectAll
      if (selectAll) {
        purchase += cartList[i].cur_price
        discount += cartList[i].price - cartList[i].cur_price
      }
    }

    let selectNum = new Number(0)
    if (selectAll) {
      selectNum = cartList.length
    }

    this.setData({
      selectAll: selectAll,
      selectNum: selectNum,
      purchase: purchase.toFixed(2),
      discount: discount.toFixed(2),
      cartList: cartList,
    })
  },

  // 单选
  bindSelect: function (e) {
    let dataset = e.currentTarget.dataset
    let idx = Number(dataset.idx)
    let cartList = this.data.cartList
    let selectNum = this.data.selectNum
    // 更新该商品的选择状态
    cartList[idx].selected = !cartList[idx].selected
    // 更新付费金额和优惠金额数目
    let purchase = parseFloat(this.data.purchase)
    let discount = parseFloat(this.data.discount)
    if (cartList[idx].selected) {
      purchase += cartList[idx].cur_price
      discount += cartList[idx].price - cartList[idx].cur_price
      selectNum++
    } else {
      purchase -= cartList[idx].cur_price
      discount -= cartList[idx].price - cartList[idx].cur_price
      selectNum--
    }
    purchase = purchase <= 0 ? 0 : purchase
    discount = discount <= 0 ? 0 : discount
    selectNum = selectNum <= 0 ? 0 : selectNum

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
      selectNum: selectNum,
      purchase: purchase.toFixed(2),
      discount: discount.toFixed(2),
      cartList: cartList,
    })
  },

  // 改变数量
  bindChangeNum: function (e) {
    let num = e.detail.num
    let idx = e.currentTarget.dataset.idx
    let cartList = this.data.cartList
    cartList[idx].num = num
    cartList[idx].isEdit = true
    this.cartList = cartList

    if (!cartList[idx].selected) {
      return
    }

    // 重新计算应付金额和促销优惠金额
    let purchase = 0, discount = 0
    for (let i in cartList) {
      let item = cartList[i]
      if (item.selected) {
        purchase += item.cur_price * item.num
        discount += (item.price - item.cur_price) * item.num
      }
    }
    this.setData({
      purchase: purchase.toFixed(2),
      discount: discount.toFixed(2),
    })
  },

  // 结算
  // 结算时不删除购物车选中的商品，提交订单才删除
  bindConfirm: function (e) {
    if (this.data.selectNum == 0) {
      // 弹窗提示
      wx.showToast({
        title: '未选中商品',
        icon: "error",
        duration: 1000,
      })
      return
    }

    let cartList = this.data.cartList
    let confirmList = new Array
    for (let i in cartList) {
      let item = cartList[i]
      if (!item.selected) {
        continue
      }
      confirmList.push({
        'id': item.id,
        'product_id': item.product_id,
        'title': item.title,
        'price': item.price,
        'cur_price': item.cur_price,
        'image': item.image,
        'num': item.num,
      })
    }

    let confirmData = {
      'purchase': parseFloat(this.data.purchase),
      'discount': parseFloat(this.data.discount),
      'list': confirmList,
    }
    // 跳转到订单确认页面
    let url = '../order/order_confirm/order_confirm?data=' + JSON.stringify(confirmData)
    wx.navigateTo({
      url: url,
    })
  },

  // 批量移入收藏
  bindBatchMoveToCollect: function (e) {

  },

  // 批量删除
  bindBatchDel: function (e) {

  },
})