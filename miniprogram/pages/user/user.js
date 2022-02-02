const app = getApp()

// pages/user/user.js
Page({
  data: {
    hasLogin: false,
    token: "",
    userInfo: {
      nickname: "没影子的猫h",
      avatar: ""
    }
  },

  onLoad: function (options) {
    let token = app.globalData.token
    if (token != "") {
      this.data.token = token
      // 获取用户信息
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  onPullDownRefresh: function () {},

  clickJumpUserInfo: function () {
    var jumpUrl = '../user-info/user-info?nickName=' +
      this.data.nickname + '&avatar=' + this.data.avatar
    wx.navigateTo({
      url: jumpUrl,
    })
  },
})