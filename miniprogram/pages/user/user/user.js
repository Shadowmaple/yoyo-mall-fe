const app = getApp()

// pages/user/user.js
Page({
  data: {
    hasLogin: false,
    userInfo: {
      nickname: "--",
      avatar: ""
    }
  },

  onLoad: function (options) {
    if (app.globalData.hasUserInfo) {
      this.setData({
        hasLogin: true,
        userInfo: app.globalData.userInfo,
      })
    }
  },

  onShow: function () {
    if (app.globalData.hasUserInfo) {
      this.setData({
        hasLogin: true,
        userInfo: app.globalData.userInfo,
      })
    }
  },

  clickJumpUserInfo: function () {
    let url = '../user_info/user_info?nickname=' + this.data.userInfo.nickname + '&avatar=' + this.data.userInfo.avatar

    // 未登录
    if (!this.data.hasLogin) {
      url = '/pages/login/login'
    }

    wx.navigateTo({
      url: url,
    })
  },

  bindJumpOrder: function (e) {
    let kind = e.currentTarget.dataset.kind
    let url = '/pages/order/order_list/order_list?kind=' + kind

    if (!this.data.hasLogin) {
      url = '/pages/login/login'
    }

    wx.navigateTo({
      url: url,
    })
  },

  bindJumpModule: function (e) {
    let url = e.currentTarget.dataset.url

    if (!this.data.hasLogin) {
      url = '/pages/login/login'
    }

    wx.navigateTo({
      url: url,
    })
  },
})