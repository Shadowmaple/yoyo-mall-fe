// pages/address/add/add.js
const request = require('../../../utils/request/address')

Page({
  data: {
    name: "",
    tel: "",
    province: "",
    city: "",
    district: "",
    detail: "",
    is_default: true,
    region: '',
    regionValue: [],
  },
  id: 0,

  onLoad: function (options) {
    if (options == null || options.data == null) {
      return
    }
    let data = JSON.parse(options.data)
    this.id = data.id
    this.setData({
      name: data.name,
      tel: data.tel,
      province: data.province,
      city: data.city,
      district: data.district,
      detail: data.detail,
      is_default: data.is_default,
      region: data.province + ' ' + data.city + ' ' + data.district,
      regionValue: [data.province, data.city, data.district],
    })
  },

  bindInputEvent: function (e) {
    let value = e.detail.value
    let kind = Number(e.currentTarget.dataset.kind)
    switch (kind) {
      case 0: this.data.name = value; break;
      case 1: this.data.tel = value; break;
      case 3: this.data.detail = value; break;
    }
  },

  bindRegionChange: function (e) {
    let value = e.detail.value
    console.log('bindRegionChange: ', value)
    this.setData({
      province: value[0],
      city: value[1],
      district: value[2],
      region: value[0] + ' ' + value[1] + ' ' + value[2],
      regionValue: value,
    })
  },

  // 定位
  // todo
  bindLocate: function (e) {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log('location: ', res)
        const latitude = res.latitude
        const longitude = res.longitude
        wx.chooseLocation({
          latitude: latitude,
          longitude: longitude,
          success: res => {
            console.log('--', res)
          }
        })
      }
    })
  },

  bindChangeDefault: function (e) {
    this.data.is_default = e.detail.value
  },

  bindConfirm: function (e) {
    let req = {
      id: this.id,
      name: this.data.name,
      tel: this.data.tel,
      province: this.data.province,
      city: this.data.city,
      district: this.data.district,
      detail: this.data.detail,
      is_default: this.data.is_default,
    }

    // 校验输入信息
    if (!this.validInput(req)) {
      return
    }

    wx.showLoading()
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)

    request.addressAdd(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('request.addressAdd error: ', res)
        wx.showToast({
          title: res.msg,
          icon: 'error',
          duration: 1000,
        })
        return
      }

      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000,
      })

      wx.navigateBack({
        delta: 0,
      })
    })
  },

  validInput: function (data) {
    let msg = ''
    if (data.name == '') {
      msg = '姓名不能为空'
    }
    if (data.tel == '') {
      msg = '联系电话不能为空'
    }
    if (data.province == '' || data.city == '' || data.district == '') {
      msg = '所在地区不能为空'
    }
    if (data.detail == '') {
      msg = '详细地址不能为空'
    }

    // todo: 校验联系电话
    if (data.tel != '') {
      
    }

    if (msg == '') {
      return true
    }

    wx.showModal({
      title: '信息填写错误',
      content: msg,
      showCancel: false,
    })
    return false
  }
})