const app = getApp()
const model = require('./model')

const login = (req, callback) => {
  let url = model.BaseURL + model.Paths.login
  let data = {
    code: req.code,
  }

  wx.request({
    url: url,
    method: 'POST',
    data: data,
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('login failed: ', res)
    },
  })
}

const getUserInfo = (req, callback) => {
  let url = model.BaseURL + model.Paths.userInfo

  wx.request({
    url: url,
    method: 'get',
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.getUserInfo failed: ', res)
    },
  })
}

const updateUserInfo = (req, callback) => {
  let url = model.BaseURL + model.Paths.userInfo
  let data = {
    avatar: req.avatar,
    nickname: req.nickname,
    gender: req.gender,
  }

  wx.request({
    url: url,
    method: 'POST',
    data: data,
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('login failed: ', res)
    },
  })
}

module.exports = {
  login,
  getUserInfo,
  updateUserInfo,
}