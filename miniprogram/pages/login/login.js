// pages/login/login.js
const app = getApp()
const util = require('../../utils/base')

Page({
  data: {},

  onLoad: function (options) {},

  bindLogin: function (e) {
    util.login(res => {
      if (res == null || !res.ok) {
        wx.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 1000,
        })
        return
      }

      setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, 1500)

      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000,
      })
    })
  },

  bindCancel: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },
})