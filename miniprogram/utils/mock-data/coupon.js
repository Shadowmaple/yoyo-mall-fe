const list = [{
  "id": 2,
  "begin_time": "",
  "end_time": "",
  "cid": 2,
  "cid2": 4,
  "title": "大额优惠 满200减20",
  "discount": 20,
  "threshold": 200,
  "kind": 0,
  "remain": 200,
  "is_public": true,
  "grab_begin_time": "2022-01-01 12:00:00",
  "grab_end_time": "2022-01-31 12:00:00",
  "has_grabbed": true, // 已领取
  'status': 1, // 0等待开抢，1已开抢，2已领取，3已抢完，4已结束（过了grab_end_time）
}]

const coupon = {
  "id": 2,
  "begin_time": "2022-01-01 12:00:00",
  "end_time": "2022-02-28 12:00:00",
  "cid": 2,
  "cid2": 4,
  "title": "大额神券 满200减20",
  "discount": 20,
  "threshold": 200,
}

const privateList = [{
  "id": 2,
  "begin_time": "2022-01-01 12:00:00",
  "end_time": "2022-01-31 12:00:00",
  "cid": 2,
  "cid2": 4,
  "title": "大额神券 满200减20",
  "discount": 20, // 立减金额
  "threshold": 200, // 门槛
}]

module.exports = {
  list,
  coupon,
  privateList,
}