const app = getApp()
const model = require('./model')

const searchProduct = (req, callback) => {
  let url = model.BaseURL + model.Paths.productSearch
  let data = req

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    data: data,
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.searchProduct failed: ', res)
    }
  })
}

const searchOrder = (req, callback) => {
  let url = model.BaseURL + model.Paths.orderSearch
  let data = req

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    data: data,
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.searchOrder failed: ', res)
    }
  })
}

module.exports = {
  searchProduct,
  searchOrder,
}
