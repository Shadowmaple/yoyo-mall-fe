// pages/user/user_info/user_info.js
const request = require('../../../utils/request/user')
const app = getApp()

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

  bindInput: function (e) {
    this.data.nickname = e.detail.value
  },

  // 保存
  bindConfirm: function (e) {
    if (this.data.nickname == '') {
      wx.showModal({
        showCancel: false,
        content: '用户昵称不能为空！'
      })
      return
    }

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '保存修改',
      content: '确认保存更改？',
      success: res => {
        if (!res.confirm) {
          return
        }
        let req = {
          avatar: this.data.avatar,
          nickname: this.data.nickname,
        }
        request.updateUserInfo(req, res => {
          if (res.code != 0) {
            console.warn('request.updateUserInfo error:', res)
            wx.showToast({
              title: '修改失败',
              icon: 'error',
              duration: 1500,
            })
            return
          }
          console.log('用户信息修改成功；req=', req)

          // 同步用户信息更改
          let info = app.globalData.userInfo
          info.nickname = req.nickname
          info.avatar = req.avatar
          app.globalData.userInfo = info
          wx.setStorage({
            key: 'userInfo',
            data: info,
          })

          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500);
        })
      }
    })
  },

  // 更改头像
  bindChangeAvatar: function (e) {

  },
})