Component({
  options: {},
  data: {},
  properties: {
    // 默认显示的文字内容
    text: {
      type: String,
      value: "请输入关键字"
    },
    // 点击是否跳转到指定页面
    isJump: {
      type: Boolean,
      value: true,
    },
    // 跳转页面地址
    src: {
      type: String,
      value: "/pages/search/search/search",
    }
  },
  methods: {
    clickClick: function(e) {
      if (!this.properties.isJump) {
        return
      }
      let url = this.properties.src
      wx.navigateTo({
        url: url,
      })
    }
  }
})