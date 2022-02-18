// pages/product/product_list/product_list.js

const app = getApp()
const request = require('../../../utils/request/product.js')
const mock = require('../../../utils/mock-data/product')

const basicColumn = {
  id: 0,
  name: '全部'
}
const tabs =[
  {name: '默认', kind: 0}, {name: '销量', kind: 1}, {name: '价格', kind: 2},
  {name: '好评', kind: 4}, {name: '出版时间', kind: 5}
]

Page({
  data: {
    searchText: "",
    tabs: tabs,
    tabKind: 0,
    // picker
    cidList: [],
    cidIndex: [0, 0],
    curCidShow: {
      cid: basicColumn,
      cid2: basicColumn,
    },
    productList: mock.productList,
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
    if (options != null) {
      this.reqParams.cid = Number(options.cid)
      this.reqParams.cid2 = Number(options.cid2)
      this.processCidList(this.reqParams.cid, this.reqParams.cid2)
    }

    this.requestProductList()
  },

  // 处理类目选择器，格式转换
  processCidList: function (cid, cid2) {
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
      for (let j in category[cidIndex - 1].list) {
        let item = category[cidIndex - 1].list[j]
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
  },

  bindColumnChange: function (e) {
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
    let cid1Item = this.originalCidList[targetIndex - 1]
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

  bindPickerChange: function (e) {
    console.info('pickerchange:', e.detail)
    let cidIndex = e.detail.value[0], cid2Index = e.detail.value[1]
    let curCidShow = {
      cid: this.data.cidList[0][cidIndex],
      cid2: this.data.cidList[1][cid2Index],
    }

    this.setData({
      cidIndex: [cidIndex, cid2Index],
      curCidShow: curCidShow,
    })

    // 重新请求数据
    this.reqParams.cid = curCidShow.cid.id
    this.reqParams.cid2 = curCidShow.cid2.id
    this.requestProductList()
  },

  clickChangeSortKind: function (e) {
    let kind = Number(e.currentTarget.dataset.kind)
    this.reqParams.sort = kind
    this.reqParams.page = 0
    this.setData({
      tabKind: kind,
    })

    this.requestProductList()
  },

  requestProductList: function () {
    let req = this.reqParams

    wx.showLoading()

    setTimeout(() => {
      wx.hideLoading()
    }, 3000);

    request.productList(req, res => {
      wx.hideLoading()
      if (res.code != 0) {
        console.warn('requestProductList error:', res)
        return
      }
      this.setData({
        productList: res.data.list,
      })
    })
  },

  bindJumpInfo: function (e) {
    let id = e.currentTarget.dataset.id

    let url = '../product_info/product_info?id=' + id
    wx.navigateTo({
      url: url,
    })
  },
})