// pages/product/evaluation_info/evaluation_info.js
const mock = require('../../../utils/mock-data/comment')

Page({
  data: {
    evaluation: mock.evaluation,
    comments: mock.commentList,
    inputText: "",
  },

  onLoad: function (options) {
    if (options == null || options == "") {
      return
    }
    let data = JSON.parse(options.data)
    let id = data.id
    
    // todo 请求评论列表
    // ...
    
    this.setData({
      evaluation: data,
    })
  },

  bindInput: function (e) {
    this.data.inputText = e.detail.value
  },

  bindPublish: function (e) {
    
  },

  bindLike: function (e) {

  },

})