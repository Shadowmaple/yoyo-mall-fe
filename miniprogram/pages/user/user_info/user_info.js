// pages/user/user_info/user_info.js
Page({
  data: {
    nickname: '',
    avatar: '',
  },

  onLoad: function (options) {
    if (options == null) {
      return
    }
    let nickname = options.nickname
    let avatar = options.avatar
    this.setData({
      nickname: nickname,
      avatar: avatar,
    })
  },
})