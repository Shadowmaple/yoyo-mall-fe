const app = getApp()

// pages/user/user.js
Page({
  data: {
    hasLogin: false,
    token: "",
    userInfo: {
      nickname: "没影子的猫h",
      avatar: "/images/user-unlogin.png"
    }
  },

  onLoad: function (options) {
    let token = app.globalData.token
    if (token != "") {
      this.data.token = token
      // 获取用户信息
    }
  },

  clickJumpUserInfo: function () {
    var url = '../user_info/user_info?nickName=' +
      this.data.nickname + '&avatar=' + this.data.avatar
    wx.navigateTo({
      url: url,
    })
  },
})