// pages/login/login.js
const util = require('../../utils/base')

Page({
  data: {},

  onLoad: function (options) {},

  bindLogin: function (e) {
    util.login()
  },

  bindCancel: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },
})