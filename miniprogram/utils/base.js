const app = getApp()
const request = require('./request/user')

const login = () => {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log("login code: " + res.code)
      if (!res.code) {
        console.log('登录失败！' + res.errMsg)
        return
      }
      let req = {
        code: res.code,
      }
      request.login(req, res => {
        console.log('login res: ', res)
        if (res.code != 0) {
          console.warn('request.login error:', res)
          return
        }
        let data = res.data
        console.log('token: ', data.token)
        if (data.token == '') {
          console.warn('token from request.login is empty:', res)
          return
        }
        // 保存到全局数据
        app.globalData.token = data.token
        // 保存到缓存
        wx.setStorage({
          key: 'token',
          data: data.token,
        })

        // 用户信息
        getUserInfo(data.is_new, res => {
          if (res == null) {
            console.warn('getUserInfo error')
            return
          }
          app.globalData.hasUserInfo = true
          app.globalData.userInfo = res
          wx.setStorage({
            key: 'userInfo',
            data: userInfo
          })
        })
      })
    }
  })
}

// 获取用户信息
// 不是新用户，从后端数据库获取用户信息，
// 否则从小程序获取用户信息，再存入后端数据库
const getUserInfo = (is_new, callback) => {
  let data = null
  if (!is_new) {
    let req = {}
    request.getUserInfo(req, res => {
      if (res.code != 0) {
        console.warn('request.getUserInfo error: ', res)
        return
      }
      data = {
        nickname: res.data.nickname,
        avatar: res.data.avatar,
        gender: res.data.gender,
      }
      callback(data)
    })
    return
  }

  wx.showModal({
    title: '授权登陆',
    content: '授权微信登陆并获取基本信息',
    showCancel: false,
    confirmText: '授权',
    placeholderText: 'test',
    success: res => {
      if (res.confirm) {
        console.log('用户点击确定')
        getUserProfile()
      }
    }
  })
}

const getUserProfile = () => {
  // 使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  wx.getUserProfile({
    desc: '展示用户信息',
    success: res => {
      var userInfo = {
        'nickname': res.userInfo.nickName,
        'avatar': res.userInfo.avatarUrl,
        'gender': res.userInfo.gender,
      }

      // 请求后台API更新用户信息
      request.updateUserInfo(userInfo, res => {
        if (res.code != 0) {
          console.warn('request.updateUserInfo error:', res)
          return
        }
      })

      callback(userInfo)
    },
    fail: res => {
      console.error('getUserProfile failed: ', res)
    }
  })
}

module.exports = {
  login,
}