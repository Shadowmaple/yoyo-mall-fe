// pages/feedback/feedback.js
const staticType = ['产品建议', '功能异常', '违规举报', '交易投诉']

Page({
  data: {
    typeList: staticType,
    content: "",
    curType: 0,
    pictures: [],
  },

  onLoad: function (options) {

  },

  bindTypeChange: function (e) {
    let idx = e.detail.value
    this.setData({
      curType: idx,
    })
  },

  bindContentInput: function (e) {
    this.data.content = e.detail.value
  },

  bindAddPicture: function (e) {

  },

  bindConfirm: function (e) {
    let req = {
      kind: this.data.curType,
      content: this.data.content,
      pictures: this.data.pictures,
    }
  },
})