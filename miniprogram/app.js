const Host = "127.0.0.1:4386"
const Paths = {
  login: "/user/login",
  userInfo: "/user/info",
  productList: "/product/list",
  productInfo: "/product/info/",
  productSearch: "/search/product",
  productRank: "/product/rank"
}

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    token: "",
    userInfo: null,
    baseURL: Host + "/api/v1",
    paths: Paths
  }
})
