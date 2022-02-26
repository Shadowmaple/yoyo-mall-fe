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
    let url = '../user_info/user_info?nickname=' + this.data.nickname + '&avatar=' + this.data.avatar

    // 未登录
    if (!this.data.hasLogin) {
      url = '/pages/login/login'
    }

    wx.navigateTo({
      url: url,
    })
  },
})