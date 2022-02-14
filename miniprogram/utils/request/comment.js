const app = getApp()
const model = require("model.js")

const like = (req, callback) => {
  let url = ''

  wx.request({
    url: url,
    method: 'POST',
    data: req,
    header: {token: app.globalData.token},
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.like failed: ', res)
    }
  })
}

const commentCreateOrUpdate = (req, callback) => {

}

module.exports = {
  like,
  commentCreateOrUpdate,
}