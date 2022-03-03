const orderList = [{
    "id": 2, // 订单id
    // 0->待付款，1->待发货，2->待收货，3->待评价，4->交易完成，5->交易取消，6->退货中，7->交易关闭
    "status": 0,
    "total_fee": 20.99, // 应付总金额
    "payment": 20.88, // 实付总金额
    "coupon": 0.11, // 优惠金额
    "freight": 0, // 运费
    "receive_name": "李明",
    "receive_tel": 101,
    "receive_addr": "湖北省武汉市洪山区雄楚大道382号",
    "order_code": "1239812378912", // 订单编号
    "create_time": "2022-01-21 15:21:00",
    "pay_time": "2022-01-21 15:21:00",
    "deliver_time": "", // 发货时间
    "confirm_time": "", // 签收时间
    "product_num": 2,
    "products": [
        {
            "id": 1,
            "title": "",
            "author": "",
            "num": 1,
            "total_fee": 27.20,
            "price": 30,
            "cur_price": 27.20,
            "image": ""
        }
    ],
}]

module.exports = {
    orderList,
}