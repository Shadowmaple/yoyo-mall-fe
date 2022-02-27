const list = [{
  id: 2,
  image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  total_fee: 20.99,
  status: 0,
  product_num: 1,
  title: '落叶飘风等',
  products: [{
    id: 23,
    title: '落叶飘风',
    author: '',
    num: 1,
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }]
}, {
  id: 3,
  image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  total_fee: 20.99,
  status: 3,
  product_num: 2,
  title: '落叶飘风等',
  products: [{
    id: 23,
    title: '落叶飘风',
    num: 1,
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }, {
    id: 231,
    title: '落叶飘风',
    num: 2,
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }, {
    id: 2312,
    title: '落叶飘风',
    num: 3,
    author: '',
    image: 'https://img1.doubanio.com/view/subject/m/public/s2206907.jpg',
  }]
}]


const orderInfo = {
  "id": 1,
  "status": 0,
  "total_fee": 20.99, // 应付总金额
  "payment": 20.88, // 实付总金额
  "coupon": 0.11, // 优惠金额
  "freight": 0, // 运费
  "receive_name": "李明",
  "receive_tel": 101,
  "receive_addr": "湖北省武汉市洪山区雄楚大道382号华中师范大学",
  "order_code": "123213", // 订单编号
  "create_time": "2022-01-21 15:21:00",
  "pay_time": "2022-01-21 15:21:00",
  "deliver_time": "", // 发货时间
  "confirm_time": "", // 签收时间
  "product_num": 2,
  "products": [
      {
          "id": 1,
          "title": "生死看淡",
          "author": "",
          "num": 1,
          "total_fee": 27.20,
          "price": 30,
          "cur_price": 27.20,
          "image": "http://img3m5.ddimg.cn/37/23/29343835-1_l_18.jpg"
      }, {
        "id": 2,
        "title": "生死看淡",
        "author": "",
        "num": 1,
        "total_fee": 27.20,
        "price": 30,
        "cur_price": 27.20,
        "image": "http://img3m5.ddimg.cn/37/23/29343835-1_l_18.jpg"
    }
  ],
}

module.exports = {
  list,
  orderInfo,
}