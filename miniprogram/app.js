const model = require("./utils/request/model.js")
const mock = require('./utils/mock-data/category')
const util = require('./utils/base')

// app.js
App({
  globalData: {
    token: "",
    hasUserInfo: false,
    userInfo: null,
    category: mock.cates,
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.checkLogin(res => {
      console.info('checkLogin res: ', res)
      // 已登录
      if (res.has_login) {
        if (this.globalData.hasUserInfo) {
          return
        }
        let userInfo = wx.getStorageSync('userInfo')
        console.log('userInfo in storage: ', userInfo)
        if (userInfo) {
          this.globalData.userInfo = userInfo
          this.globalData.hasUserInfo = true
        }
        return
      }

      // 未登录
      wx.navigateTo({
        url: '/pages/login/login',
      })
    })

    // this.requestCategory()
  },

  checkLogin: function(callback) {
    console.info('---', this.globalData)
    let token = this.globalData.token
    let res = {
      has_login: false,
    }
    if (token === "") {
      // 从缓存中获取 token
      token = wx.getStorageSync('token')
      console.log('get token from storage: ', token)
      // 缓存不存在token，调用回调函数，重新登陆、获取token
      if (!token || token === "") {
        callback(res)
        return
      }
      this.globalData.token = token
    }
    res.has_login = true
    callback(res)
  },

  // 请求获取图书类目列表
  requestCategory: function () {
    let url = model.BaseURL + model.Paths.category

    wx.request({
      url: url,
      success: res => {
        let resp = res.data
        if (resp.code != 0) {
          console.error("request category error: ", res.code, res.msg)
          return
        }
        let data = resp.data
        console.log('request category ok: ', data)
        this.globalData.category = data.list
      },
      fail: res => {
        console.error('request category failed: ', res)
      },
    })
  },
})
