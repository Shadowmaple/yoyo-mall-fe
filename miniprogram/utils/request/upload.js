const app = getApp()
const model = require("model.js")

const requestUpload = (req, callback) => {
  let url = model.BaseURL + model.Paths.upload

  wx.uploadFile({
    url: url,
    filePath: req.image,
    name: 'image',
    header: {
      token: app.globalData.token,
    },
    timeout: 6000,
    success: res => {
      let data = res.data
      callback(JSON.parse(data))
    },
    fail: res => {
      console.error('requestUpload failed:', res)
    }
  })
}

module.exports = {
  requestUpload,
}