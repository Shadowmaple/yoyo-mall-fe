const app = getApp()
const model = require('./model')

const feedback = (req, callback) => {
  let url = model.BaseURL + model.Paths.productSearch
  let data = {
    kind: req.kind,
    content: req.content,
    picture: req.picture,
  }

  wx.request({
    url: url,
    method: 'POST',
    header: {
      token: app.globalData.token,
    },
    data: data,
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.feedback failed: ', res)
    }
  })
}

module.exports = {
  feedback,
}
