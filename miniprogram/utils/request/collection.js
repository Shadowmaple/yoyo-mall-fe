
const app = getApp()
const model = require('./model')

const collectDel = (req, callback) => {
  let url = model.BaseURL + model.Paths.collection
  let data = {
    list: req.list,
    product_id: req.product_id,
  }

  wx.request({
    url: url,
    method: 'DELETE',
    header: {
      token: app.globalData.token,
    },
    data: data,
    timeout: 3000,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('collectionDel failed: ', res)
    }
  })
  
}

const collectList = (req, callback) => {
  let url = model.BaseURL + model.Paths.collection
  let data = {
    limit: req.limit,
    page: req.page,
  }

  wx.request({
    url: url,
    method: 'GET',
    header: {
      token: app.globalData.token,
    },
    data: data,
    timeout: 3000,
    success: res => {
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('collectionList failed: ', res)
    }
  })
}

const collectAdd = (req, callback) => {
  let url = model.BaseURL + model.Paths.collection
  let data = {
    list: req.list,
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
      let resp = res.data
      callback(resp)
    },
    fail: res => {
      console.error('collectionAdd failed: ', res)
    }
  })
}

module.exports = {
  collectDel,
  collectList,
  collectAdd,
}