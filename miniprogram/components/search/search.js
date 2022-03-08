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
      value: "/pages/search/search/search",
    },
    // 输入确认跳转地址
    confirmSrc: {
      type: String,
      value: ""
    },
    // 0->商品搜素，1->订单搜素
    kind: {
      type: Number,
      value: 0,
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
      let value = e.detail.value
      var call = {
        value: value,
      }
      this.triggerEvent('confirm', call)

      // 存储搜素记录
      // let key = this.getStoreKey()
      // console.info('-- key', key)
      // if (key != null && key != '' && value != '') {
      //   console.log('-- store')
      //   let raw = wx.getStorageSync(key)
      //   console.info('-- raw', raw)
      //   let list = new Array
      //   if (raw != null && raw != '') {
      //     list = JSON.parse(raw)
      //   }
      //   list.push(value)
      //   wx.setStorage({
      //     key: key,
      //     data: JSON.stringify(list),
      //   })
      // }

      if (this.properties.confirmSrc == '') {
        return
      }

      let url = this.properties.confirmSrc + '?value=' + value
      wx.navigateTo({
        url: url,
      })
    },

    getStoreKey: function () {
      switch (this.properties.kind) {
        case 0: return 'search-history-p'
        case 1: return 'search-history-o'
      }
      return ''
    },
  }
})