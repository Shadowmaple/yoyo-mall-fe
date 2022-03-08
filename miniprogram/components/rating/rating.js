Component({
  options: {},
  data: {
    stars: [2, 2, 2, 2, 2], // 0->空心star, 1->半个star，2->整个star
  },
  properties: {
    // 分值
    value: {
      type: Number,
      value: 10,
    },
    size: {
      type: Number,
      value: 24,
    }
  },
  lifetimes: {
    attached() {
      this.set()
    },
  },
  methods: {
    set() {
      let value = this.properties.value
      let stars = this.data.stars
      for (let i = 0; i < 5; i++) {
        let flag = 0
        if (value >= 2) {
          flag = 2
          value -= 2
        } else if (value > 0 && value < 2) {
          flag = 1
          value = 0
        } else {
          flag = 0
        }
        stars[i] = flag
      }
      this.setData({
        stars: stars,
      })
    }
  },
  observers: {
    'value': function(value) {
      this.set()
    },
  }
})