// pages/collection/collection.js
const request = require('../../utils/request/collection')

Page({
  data: {
    hasData: true,
    isEdit: false,
    selectAll: false,
    list: [{
      "id": 1,
      "title": "叶落知声（的撒发链接送大礼附件阿里）",
      "author": "舒金浩",
      "publisher": "浙江科技出版社",
      "price": 20,
      "cur_price": 18.5,
      "image": "https://img1.doubanio.com/view/subject/m/public/s2206907.jpg",
      "stock": 20, // 库存
      'selected': false,
  }],
  },

  onLoad: function (options) {

  },

  onPullDownRefresh: function () {

  },

  bindEdit: function (e) {
    this.setData({
      isEdit: !this.data.isEdit,
    })
  },

  bindDel: function (e) {
    let delList = new Array
    let list = this.data.list
    let curList = new Array
    for (let i in list) {
      if (list[i].selected) {
        delList.push(list[i].id)
      } else {
        curList.push(list)
      }
    }

    let req = {list: delList}

    // todo 请求删除
    request.collectDel(req, res => {

    })

    this.setData({
      isEdit: false,
      selectAll: false,
      list: curList,
    })
  },

  bindSelect: function (e) {
    let idx = Number(e.currentTarget.dataset.idx)
    let list = this.data.list
    // 更新该商品的选择状态
    list[idx].selected = !list[idx].selected

    // 更新全选状态
    let flag = true
    let selectedNum = 0, unselectedNum = 0
    for (let i in list) {
      if (list[i].selected) {
        selectedNum++
      } else {
        unselectedNum++
      }
      if (selectedNum > 0 && unselectedNum > 0) {
        flag = false
        break
      }
    }
    let selectAll = this.data.selectAll
    if (flag) {
      selectAll = selectedNum == list.length ? true : false
    }

    this.setData({
      selectAll: selectAll,
      list: list,
    })
  },

  bindSelectAll: function (e) {
    let selectAll = !this.data.selectAll
    let list = this.data.list
    for (let i in list) {
      list[i].selected = selectAll
    }

    this.setData({
      selectAll: selectAll,
      list: list,
    })
  },
})