// pages/product/product_list/product_list.js

const app = getApp()
const basicColumn = {id: 0, name: '全部'}
const request = require('../../../utils/request/product.js')

Page({
  data: {
    searchText: "",
    cidList: [],
    cidIndex: [0, 0],
    curCidShow: {
      cid: {id: 0, name: '全部'},
      cid2: {id: 0, name: '全部'},
    },
    productList: [{
      "id": 1,
      "title": "失落的文明",
      "author": "曾力",
      "publisher": "",
      "cid": 1,
      "cid2": 2,
      "price": 20,
      "cur_price": 19.5,
      "image": "https://img1.doubanio.com/view/subject/m/public/s2206907.jpg",
      "sale_num": 100,
      "comment_num": 100,
      "comment_rate": 98,
      "score": 8.3,
      "publish_time": "2021-04-02",
      "has_star": false,
      "has_in_cart": false,
    }],
  },
  originalCidList: [],
  reqParams: {
    limit: 20,
    page: 0,
    cid: 0,
    cid2: 0,
    sort: 0,  
  },

  onLoad: function (options) {
    console.log('onLoad options:', options)
    this.processCidList(options)

    this.requestProductList()
  },

  // 处理类目选择器，格式转换
  processCidList: function(options) {
    let cid = 0, cid2 = 0
    if (options != null) {
      cid = Number(options.cid)
      cid2 = Number(options.cid2)
      // let name = options.name
    }

    let category = app.globalData.category
    this.originalCidList = category
    console.info('category:', category)
    let cid1List = [basicColumn]
    let cid2List = [basicColumn]
    let cidIndex = 0, cid2Index = 0
    

    for (let i in category) {
      let item = category[i]
      if (item.id == cid) {
        cidIndex = Number(i) + 1
      }
      cid1List.push({
        id: item.id,
        name: item.name,
      })
    }
    // 已选择一级类目
    if (cid > 0 && cidIndex > 0) {
      for (let j in category[cidIndex-1].list) {
        let item = category[cidIndex-1].list[j]
        if (cid2 == item.id) {
          cid2Index = Number(j) + 1
        }
        cid2List.push({
          id: item.id,
          name: item.name,
        })
      }
    }

    let curCidShow = {
      cid: cid1List[cidIndex],
      cid2: cid2List[cid2Index],
    }

    this.setData({
      cidList: [cid1List, cid2List],
      cidIndex: [cidIndex, cid2Index],
      curCidShow: curCidShow,
    })

    console.info('data:', this.data)
  },

  bindColumnChange: function(e) {
    let column = e.detail.column, targetIndex = e.detail.value
    if (column != 0) {
      return
    }
    let cidList = this.data.cidList
    let cid2List = [basicColumn]
    if (targetIndex == 0) {
      cidList[1] = cid2List
      this.setData({
        cidList: cidList,
      })
      return
    }
    let cid1Item = this.originalCidList[targetIndex-1]
    for (let i in cid1Item.list) {
      let item = cid1Item.list[i]
      cid2List.push({
        id: item.id,
        name: item.name,
      })
    }
    cidList[1] = cid2List
    this.setData({
      cidList: cidList,
    })
  },

  bindPickerChange: function(e) {
    console.info('pickerchange:', e)
    let cidIndex = e.detail.value[0], cid2Index = e.detail.value[1]
    let curCidShow = {
      cid: this.data.cidList[0][cidIndex],
      cid2: this.data.cidList[1][cid2Index],
    }

    this.setData({
      cidIndex: [cidIndex, cid2Index],
      curCidShow: curCidShow,
    })
  },

  clickChangeSortKind: function (e) {
    let kind = Number(e.currentTarget.dataset.kind)
    console.info('kind:', kind)
    this.reqParams = kind

    this.requestProductList()
  },

  requestProductList: function() {
    let req = this.reqParams


    // request.requestProductList(req, res => {

    // })
  },
})