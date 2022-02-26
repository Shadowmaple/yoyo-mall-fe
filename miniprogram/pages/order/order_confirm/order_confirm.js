// pages/order/order_confirm/order_confirm.js
const request = require("../../../utils/request/order.js")
const cartRequest = require("../../../utils/request/cart.js")

Page({
  data: {
    address: {
      name: '李明',
      tel: '17396120043',
      detail: '湖北省武汉市洪山区雄楚大道382号',
    },
    totalFee: 0, // 应付总金额
    payment: 0, // 实付总金额
    purchase: 0, // 商品总金额
    discount: 0, // 促销优惠额
    freight: 6, // 运费
    coupon: 0, // 优惠券优惠额
    productNum: 1,
    // 商品列表
    list: [{
      'id': 1, // 购物车记录id
      'product_id': 333,
      'title': "琐碎的",
      'price': 32.30,
      'cur_price': 30.33,
      'image': "https://img1.doubanio.com/view/subject/m/public/s2206907.jpg",
      'num': 3,
    }],
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let data = JSON.parse(options.data)
    let purchase = parseFloat(data.purchase) // 商品总金额
    let discount = parseFloat(data.discount) // 促销优惠金额
    let totalFee = purchase + this.data.freight // 应付总金额
    let payment = purchase  + this.data.freight // 实付总金额
    let list = data.list
    this.setData({
      totalFee: totalFee,
      payment: payment,
      purchase: purchase,
      discount: discount,
      productNum: list.length,
      list: list,
    })
    console.log('onLoad:', list)
  },

  // 更改地址
  bindChangeAddr: function (e) {
    // 更改地址
    // 更改运费和实付金额
  },

  // 提交订单
  bindConfirm: function (e) {
    // 1.发起请求，创建订单，成功后弹起支付确认框，并跳转到订单详情页
    // 2.发起请求，删除购物车中数据，若id不为0，则是“立即购买”过来的，无需删除
    let list = new Array
    let productList = this.data.list
    let delList = new Array

    for (let i in productList) {
      let item = productList[i]
      list.push({
        'id': item.product_id,
        'title': item.title,
        'author': item.author,
        'num': item.num,
        'total_fee': item.cur_price * item.num,
        'price': item.price,
        'cur_price': item.cur_price,
        'image': item.image,
      })
      if (item.id > 0) {
        delList.push(item.id)
      }
    }

    // 创建订单请求参数
    let req = {
      total_fee: this.data.totalFee,
      payment: this.data.purchase,
      coupon: this.data.coupon,
      freight: this.data.freight,
      receive_name: this.data.address.name,
      receive_tel: this.data.address.tel,
      receive_addr: this.data.address.detail,
      product_num: this.data.productNum,
      products: list,
    }

    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
    }, 3000);

    // 创建订单
    request.orderCreate(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('orderCreate error:', res)
        wx.showToast({
          title: '提交失败',
          icon: 'error',
          duration: 2000,
        })
        return
      }

      let orderID = res.data.id
      // 支付确认弹窗，确认支付则发起更改订单状态的请求
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '支付',
        content: '确定支付 ' + this.data.purchase + ' 元？',
        success: res => {
          // 取消支付
          if (res.cancel) {
            console.log('用户点击取消')
            wx.showToast({
              title: '已取消',
              icon: 'error',
              duration: 1500
            })
          } else if (res.confirm) {
            // 确定支付
            console.log('用户点击确定')
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1500
            })

            let req = {
              id: orderID,
              status: 1,
            }
            // 改变订单状态为已支付
            request.orderUpdate(req, res => {
              if (res.code != 0) {
                console.warn('request.orderUpdate error:', res)
                return
              }
              console.log('request.orderUpdate ok')
            })
          }

          setTimeout(() => {
            // 跳转到订单详情页面
            // 要先获取到订单id
            let url = '../order_info/order_info?id=' + orderID
            wx.navigateTo({
              url: url,
            })  
          }, 1500);
        }
      })
    })

    if (delList.length == 0) {
      return
    }
    // 删除购物车中记录
    let delReq = {
      list: delList
    }
    cartRequest.cartDel(delReq, res => {
      if (res.code != 0) {
        console.warn('request.cartDel error:', res)
        return
      }
      console.log('request.cartDel ok: req=', delReq)
    })
  },

  // 选择优惠券
  bindChooseCoupon: function (e) {
    // 更改优惠券
    // 更改实付金额
  },
})