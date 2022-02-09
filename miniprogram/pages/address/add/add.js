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
    let req = {}
    wx.showLoading({
      title: '',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)

    request.addressAdd(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        wx.showToast({
          title: '内部错误',
          icon: 'error',
          duration: 1000,
        })
      } else {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000,
        })
      }
      wx.navigateBack({
        delta: 0,
      })
    })
  },
})