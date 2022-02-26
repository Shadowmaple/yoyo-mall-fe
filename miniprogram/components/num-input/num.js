Component({
  options: {},
  data: {
    // number: 1,
    disabled1: false,
    disabled2: false,
  },
  properties: {
    min: {
      type: Number,
      value: 1,
    },
    max: {
      type: Number,
      value: 99,
    },
    number: {
      type: Number,
      value: 1,
    }
  },
  lifetimes: {
    attached: function() {
      this.setData({
        number: this.properties.number,
        disabled1: this.properties.number <= this.properties.min ? true : false,
        disabled2: this.properties.number >= this.properties.max ? true : false,
      })
    },
  },
  methods: {
    nextNum: function(e) {
      let curNum = this.properties.number + 1
      this.setData({
        number: curNum,
        disabled1: curNum <= this.properties.min ? true : false,
        disabled2: curNum >= this.properties.max ? true : false,
      })

      this.changeNum()
    },

    preNum: function(e) {
      let curNum = this.properties.number - 1
      this.setData({
        number: curNum,
        disabled1: curNum <= this.properties.min ? true : false,
        disabled2: curNum >= this.properties.max ? true : false,
      })

      this.changeNum()
    },

    bindInput: function(e) {
      let value = Number(e.detail.value)
      value = value < this.properties.min ? this.properties.min : value
      value = value > this.properties.max ? this.properties.max : value
      this.setData({
        number: value,
        disabled1: value <= this.properties.min ? true : false,
        disabled2: value >= this.properties.max ? true : false,
      })

      this.changeNum()
    },

    changeNum: function() {
      var detail = {
        num: this.properties.number,
      }
      this.triggerEvent('changeNum', detail)
    },
  }
})