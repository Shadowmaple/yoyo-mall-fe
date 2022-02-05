const Host = "127.0.0.1:4096"
const BaseURL = "http://" + Host + "/api/v1"
const Paths = {
  category: "/category",
  login: "/user/login",
  userInfo: "/user/info",
  productList: "/product/list",
  productInfo: "/product/info/",
  productSearch: "/search/product",
  productRank: "/product/rank"
}

const cates = [{
  "id": 1,
  "name": "文学",
  "list": [{
      "id": 10,
      "name": "小说",
      "image": "https://img9.doubanio.com/view/subject/s/public/s29350294.jpg"
    },
    {
      "id": 11,
      "name": "文学",
      "image": "https://img9.doubanio.com/view/subject/m/public/s3552626.jpg"
    },
    {
      "id": 12,
      "name": "青春文学",
      "image": "https://img1.doubanio.com/view/subject/m/public/s29766608.jpg"
    },
    {
      "id": 13,
      "name": "传记",
      "image": "https://img1.doubanio.com/view/subject/m/public/s33699918.jpg"
    },
    {
      "id": 14,
      "name": "散文",
      "image": "https://img9.doubanio.com/view/subject/m/public/s25616816.jpg"
    },
    {
      "id": 15,
      "name": "动漫/幽默",
      "image": "https://img1.doubanio.com/view/subject/m/public/s2206907.jpg"
    },
    {
      "id": 16,
      "name": "纪实",
      "image": "https://img9.doubanio.com/view/subject/m/public/s29111585.jpg"
    },
    {
      "id": 17,
      "name": "古诗词",
      "image": "https://img1.doubanio.com/view/subject/m/public/s32318099.jpg"
    }
  ]
},
{
  "id": 2,
  "name": "人文社科",
  "list": [{
      "id": 18,
      "name": "历史",
      "image": "https://img9.doubanio.com/view/subject/m/public/s1800355.jpg"
    },
    {
      "id": 19,
      "name": "哲学/宗教",
      "image": "https://img3.doubanio.com/view/subject/m/public/s29897220.jpg"
    },
    {
      "id": 20,
      "name": "文化",
      "image": "https://img9.doubanio.com/view/subject/s/public/s29347294.jpg"
    },
    {
      "id": 21,
      "name": "社会科学",
      "image": "https://img1.doubanio.com/view/subject/m/public/s33841867.jpg"
    },
    {
      "id": 22,
      "name": "心理学",
      "image": "https://img2.doubanio.com/view/subject/m/public/s28338983.jpg"
    },
    {
      "id": 23,
      "name": "法律",
      "image": "https://img2.doubanio.com/view/subject/m/public/s33655741.jpg"
    },
    {
      "id": 24,
      "name": "政治/军事",
      "image": "https://img2.doubanio.com/view/subject/m/public/s27269441.jpg"
    }
  ]
},
{
  "id": 3,
  "name": "经管",
  "list": [{
      "id": 25,
      "name": "经济",
      "image": "https://img9.doubanio.com/view/subject/m/public/s27780875.jpg"
    },
    {
      "id": 26,
      "name": "管理",
      "image": "https://img9.doubanio.com/view/subject/m/public/s29113625.jpg"
    },
    {
      "id": 27,
      "name": "投资理财",
      "image": "https://img2.doubanio.com/view/subject/m/public/s3354143.jpg"
    }
  ]
},
{
  "id": 4,
  "name": "艺术",
  "list": [{
      "id": 28,
      "name": "摄影",
      "image": "https://img9.doubanio.com/view/subject/s/public/s21942845.jpg"
    },
    {
      "id": 29,
      "name": "绘画",
      "image": "https://img1.doubanio.com/view/subject/m/public/s33664998.jpg"
    },
    {
      "id": 30,
      "name": "书法篆刻",
      "image": "https://img9.doubanio.com/view/subject/m/public/s33764806.jpg"
    },
    {
      "id": 31,
      "name": "音乐",
      "image": "https://img2.doubanio.com/view/subject/m/public/s28845543.jpg"
    },
    {
      "id": 32,
      "name": "舞蹈",
      "image": "https://img9.doubanio.com/view/subject/m/public/s33552965.jpg"
    }
  ]
},
{
  "id": 5,
  "name": "科技",
  "list": [{
      "id": 33,
      "name": "科普",
      "image": "https://img9.doubanio.com/view/subject/m/public/s9111416.jpg"
    },
    {
      "id": 34,
      "name": "计算机",
      "image": "https://img1.doubanio.com/view/subject/m/public/s32513229.jpg"
    },
    {
      "id": 35,
      "name": "建筑",
      "image": "https://img9.doubanio.com/view/subject/m/public/s29667115.jpg"
    },
    {
      "id": 36,
      "name": "医学",
      "image": "https://img2.doubanio.com/view/subject/m/public/s28117212.jpg"
    },
    {
      "id": 37,
      "name": "农林",
      "image": "https://img9.doubanio.com/view/subject/m/public/s6824945.jpg"
    },
    {
      "id": 38,
      "name": "自然科学",
      "image": "https://img9.doubanio.com/view/subject/m/public/s33533954.jpg"
    },
    {
      "id": 39,
      "name": "工业",
      "image": "https://img3.doubanio.com/view/subject/m/public/s33942780.jpg"
    }
  ]
},
{
  "id": 6,
  "name": "教育",
  "list": [{
      "id": 40,
      "name": "中小学教辅",
      "image": "https://img2.doubanio.com/view/subject/m/public/s29109031.jpg"
    },
    {
      "id": 41,
      "name": "考试",
      "image": "https://img9.doubanio.com/view/subject/m/public/s33322276.jpg"
    },
    {
      "id": 42,
      "name": "外语",
      "image": "https://img9.doubanio.com/view/subject/m/public/s29731505.jpg"
    },
    {
      "id": 43,
      "name": "教材",
      "image": "https://img2.doubanio.com/view/subject/m/public/s28340131.jpg"
    },
    {
      "id": 44,
      "name": "工具书",
      "image": "https://img9.doubanio.com/view/subject/m/public/s27287585.jpg"
    }
  ]
},
{
  "id": 7,
  "name": "生活",
  "list": [{
      "id": 45,
      "name": "运动",
      "image": "https://img3.doubanio.com/view/subject/m/public/s33450470.jpg"
    },
    {
      "id": 46,
      "name": "保健",
      "image": "https://img9.doubanio.com/view/subject/m/public/s33744385.jpg"
    },
    {
      "id": 47,
      "name": "旅游",
      "image": "https://img9.doubanio.com/view/subject/m/public/s22702375.jpg"
    },
    {
      "id": 48,
      "name": "两性",
      "image": "https://img9.doubanio.com/view/subject/m/public/s28045305.jpg"
    },
    {
      "id": 49,
      "name": "亲子/家教",
      "image": "https://img9.doubanio.com/view/subject/m/public/s29624136.jpg"
    },
    {
      "id": 50,
      "name": "美妆",
      "image": "https://img3.doubanio.com/view/subject/m/public/s28302750.jpg"
    },
    {
      "id": 51,
      "name": "手工",
      "image": "https://img1.doubanio.com/view/subject/m/public/s28876288.jpg"
    },
    {
      "id": 52,
      "name": "美食",
      "image": "https://img2.doubanio.com/view/subject/m/public/s29140511.jpg"
    }
  ]
},
{
  "id": 8,
  "name": "成功/励志",
  "list": [{
      "id": 53,
      "name": "心灵与修养",
      "image": "https://img1.doubanio.com/view/subject/m/public/s29237648.jpg"
    },
    {
      "id": 54,
      "name": "人际交往",
      "image": "https://img1.doubanio.com/view/subject/m/public/s33901897.jpg"
    },
    {
      "id": 55,
      "name": "成功/激励",
      "image": "https://img2.doubanio.com/view/subject/m/public/s33963701.jpg"
    },
    {
      "id": 56,
      "name": "人生哲学",
      "image": "https://img2.doubanio.com/view/subject/m/public/s29962521.jpg"
    },
    {
      "id": 57,
      "name": "口才/演讲/辩论",
      "image": "https://img1.doubanio.com/view/subject/m/public/s9346487.jpg"
    },
    {
      "id": 58,
      "name": "性格与习惯",
      "image": "https://img9.doubanio.com/view/subject/m/public/s29714854.jpg"
    }
  ]
},
{
  "id": 9,
  "name": "童书",
  "list": [{
    "id": 59,
    "name": "童书",
    "image": "https://img1.doubanio.com/view/subject/m/public/s33539207.jpg"
  }]
}
]

// app.js
App({
  globalData: {
    token: "",
    userInfo: null,
    baseURL: BaseURL,
    paths: Paths,
    category: cates,
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('wx.login ok: ', res.data)
      },
      fail: res => {
        console.error('wx.login failed: ', res)
      },
    })

    this.requestCategory()

    // wx.chooseAddress({
    //   success (res) {
    //     console.log(res.userName)
    //     console.log(res.postalCode)
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }
    // })
  },



  requestCategory: function () {
    let url = BaseURL + Paths.category

    wx.request({
      url: url,
      success: res => {
        let resp = res.data
        if (resp.code != 0) {
          console.error("request category error: ", res.code, res.msg)
          return
        }
        let data = resp.data
        console.log('request category ok: ', data)
        this.globalData.category = data.list
      },
      fail: res => {
        console.error('request category failed: ', res)
      },
    })
  },
})
