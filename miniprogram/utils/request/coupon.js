const app = getApp()
const model = require("model.js")

// 优惠券领取和兑换
const couponGrab = (req, callback) => {
  let url = model.BaseURL + model.Paths.coupon
  let data = {
    code: req.code,
    id: req.id,
  }

  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.conponGrab failed: ', res)
    }
  })
}

const couponPrivate = (req, callback) => {
  let url = model.BaseURL + model.Paths.couponPrivate
  let data = {
    status: req.status,
  }

  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.couponPrivate failed: ', res)
    }
  })
}

const couponPublic = (req, callback) => {
  let url = model.BaseURL + model.Paths.couponPublic
  let data = {
    page: req.page,
    limit: req.limit,
    cid: req.cid,
    cid2: req.cid2,
  }

  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.couponPublic failed: ', res)
    }
  })
}

const couponUse = (req, callback) => {
  let url = model.BaseURL + model.Paths.couponPrivate
  let data = {
    id: req.id,
  }

  wx.request({
    url: url,
    method: 'PUT',
    data: data,
    header: {
      token: app.globalData.token,
    },
    timeout: 3000,
    success: res => {
      callback(res.data)
    },
    fail: res => {
      console.error('request.couponUse failed: ', res)
    }
  })
}

module.exports = {
  couponGrab,
  couponPrivate,
  couponPublic,
  couponUse,
}
