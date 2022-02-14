Component({
  options: {},
  data: {
    value: "",
  },
  properties: {
    // 默认显示的文字内容
    text: {
      type: String,
      value: "请输入关键字"
    },
    // 点击是否跳转到指定页面
    isJump: {
      type: String,
      value: "true",
    },
    // 点击跳转页面地址
    jumpSrc: {
      type: String,
      value: "",
    },
    // 输入确认跳转地址
    confirmSrc: {
      type: String,
      value: "/pages/search/search_list/search_list"
    }
  },
  methods: {
    clickClick: function (e) {
      if (this.properties.isJump != "true") {
        return
      }
      let url = this.properties.jumpSrc
      wx.navigateTo({
        url: url,
      })
    },

    clear: function (e) {
      this.setData({
        value: "",
      })
    },

    bindConfirm: function (e) {
      if (this.properties.confirmSrc == '') {
        return
      }
      let value = e.detail.value
      let url = this.properties.confirmSrc + '?value=' + value
      wx.navigateTo({
        url: url,
      })
    }
  }
})