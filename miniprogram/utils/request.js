const app = getApp()

var requestProductList = (req, callback) => {
  let url = app.globalData.paths.productList
  wx.showLoading({
    title: '加载中',
  })

  wx.request({
    url: url,
    method: "GET",
    header: {
      token: app.globalData.token,
    },
    timeout: 5000,
    data: {
      kind: req.kind,
      limit: req.limit,
      page: req.page,
    },
    success: res => {
      let resp = res.data
      if (resp.code != 0) {
        console.warn('requestProductList error:', reqsp)
        return
      }
      callback(resp)
    },
    fail: res => {
      console.error('requestProductList failed:', res)
    },
    complete: res => {
      wx.hideLoading()
    }
  })
}

module.exports = {
  requestProductList
}