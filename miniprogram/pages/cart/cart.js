// pages/cart/cart.js
const app = getApp()
const request = require('../../utils/request/cart')
const colRequest = require('../../utils/request/collection')
const mock = require('../../utils/mock-data/cart')

Page({
  hasLogin: false,
  data: {
    isEdit: false,
    selectAll: false,
    selectNum: 0,
    purchase: '0', // 商品总金额
    discount: '0', // 商品促销优惠金额
    // cartList: mock.list,
    cartList: [],
  },

  onLoad: function (options) {
    if (app.globalData.token != '') {
      this.hasLogin = true
      this.requestCart()
    }
  },

  // 页面切回来展示时刷新数据
  onShow: function () {
    if (app.globalData.token != '') {
      this.hasLogin = true
      this.requestCart()
    }
  },

  // 页面隐藏时保存商品数
  onHide: function () {

  },

  // 下拉刷新
  onPullDownRefresh: function () {
    if (!this.hasLogin) {
      return
    }
    this.setData({
      isEdit: false,
      selectAll: false,
      selectNum: 0,
      purchase: '0',
      discount: '0',
    })
    this.requestCart()
  },

  // 请求购物车数据
  requestCart: function () {
    if (!this.hasLogin) {
      return
    }

    let req = {}
    request.cartList(req, res => {
      if (res.code != 0) {
        console.warn('request.cartList error:', res)
        return
      }
      let data = res.data
      let list = new Array
      for (let i in data.list) {
        let item = data.list[i]
        list.push({
          id: item.id,
          product_id: item.product_id,
          title: item.title,
          author: item.author,
          price: item.price,
          cur_price: item.cur_price,
          image: item.image,
          num: item.num,
          selected: false,
          isEdit: false,
        })
      }
      this.setData({
        cartList: list,
      })
    })
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

  bindJumpInfo: function (e) {
    let productID = e.currentTarget.dataset.product
    let url = "/pages/product/product_info/product_info?id=" + productID
    wx.navigateTo({
      url: url,
    })
  },

  // 批量移入收藏
  bindBatchMoveToCollect: function (e) {
    if (!this.hasLogin) {
      return
    }
    let list = this.data.cartList
    let newList = new Array
    let reqList = new Array
    for (let i in list) {
      let item = list[i]
      if (item.selected) {
        reqList.push(item.id)
      } else {
        newList.push(item)
      }
    }
    if (reqList.length == 0) {
      return
    }
    // 1.加入收藏夹
    // 2.购物车中删除
    let colReq = {
      list: reqList,
    }
    colRequest.collectAdd(colReq, res => {
      if (res.code != 0) {
        console.warn('request.collectAdd error:', res)
        return
      }
      console.log('request.collectAdd ok:', colReq)
    })

    let delReq = {
      list: reqList,
    }
    request.cartDel(delReq, res => {
      if (res.code != 0) {
        console.warn('request.cartDel error:', res)
        return
      }
      console.log('request.cartDel ok:', delReq)
      this.setData({
        cartList: newList,
      })
    })
  },

  // 批量删除
  bindBatchDel: function (e) {
    if (!this.hasLogin) {
      return
    }
    let list = this.data.cartList
    let newList = new Array
    let delList = new Array
    for (let i in list) {
      let item = list[i]
      if (item.selected) {
        delList.push(item.id)
      } else {
        newList.push(item)
      }
    }
    console.info('--', delList, list)
    if (delList.length == 0) {
      return
    }
    let req = {
      list: delList,
    }
    request.cartDel(req, res => {
      if (res.code != 0) {
        console.warn('request.cartDel error:', res)
        return
      }
      console.log('request.cartDel ok:', req)
      this.setData({
        cartList: newList,
      })
    })
  },
})