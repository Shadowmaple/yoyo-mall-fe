const evaluationList = [{
  "id": 1,
  "order_id": 1,
  "content": "来到一座城市，第一件要干的事情不是拿起相机四处寻找可以拍摄的景点。请先放下一切让你觉得累赘的东西吧！随处逛逛，感受下城市的气息。放空自己，纯粹地观察眼前城市的一切。这座城市的道路是宽阔还是狭窄？空气中飘荡的味道是怎样的？这片街区流行什么色调？道路边种植的什么植物？建筑物是什么颜色和风格？我们对于城市的理解往往就会在这个过程中一点点地累积起来。",
  "score": 4,
  "level": 0, // 0好评
  "user_nickname": "66666",
  "user_avatar": "",
  "is_anonymous": false,
  "time": "2020-12-12 12:00:00",
  "pictures": ["https://cdn.sspai.com/2022/01/14/90469be5350f7ea4f15d4d6cca4efda9.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1", "https://cdn.sspai.com/2022/01/15/45a1d4795cde399ebc1a1bcf3cf08a01.jpg?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1"],
  "like_num": 2,
  "reply_num": 2,
  "has_liked": false,
  "can_handle": true // 是自己发表的评价就可以进行修改删除操作
}]

const evaluation = {
  "id": 1,
  "order_id": 1,
  "content": "来到一座城市，第一件要干的事情不是拿起相机四处寻找可以拍摄的景点。请先放下一切让你觉得累赘的东西吧！随处逛逛，感受下城市的气息。放空自己，纯粹地观察眼前城市的一切。这座城市的道路是宽阔还是狭窄？空气中飘荡的味道是怎样的？这片街区流行什么色调？道路边种植的什么植物？建筑物是什么颜色和风格？我们对于城市的理解往往就会在这个过程中一点点地累积起来。",
  "score": 4,
  "level": 0, // 0好评
  "user_nickname": "66666",
  "user_avatar": "",
  "is_anonymous": false,
  "time": "2020-12-12 12:00:00",
  "pictures": ["https://cdn.sspai.com/2022/01/14/90469be5350f7ea4f15d4d6cca4efda9.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1", "https://cdn.sspai.com/2022/01/15/45a1d4795cde399ebc1a1bcf3cf08a01.jpg?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1"],
  "like_num": 2,
  "reply_num": 2,
  "has_liked": false,
  "can_handle": true // 是自己发表的评价就可以进行修改删除操作
}

const commentList = [{
  "id": 1,
  "content": "不同城市有着自己的风格，不同的人参观同一座城市也可能有不同印象。试试闭上眼睛，尝试概括一下城市带给你什么样的印象？不一定是某个抽象的词语，可以具体到某个物件或者某个特别的场景。",
  "user_nickname": "888",
  "user_avatar": "",
  "is_anonymous": false,
  "like_num": 2, // 点赞数
  "has_liked": false,
  "can_handle": false,
  "time": "2021-01-01"
}]

module.exports = {
  evaluationList,
  evaluation,
  commentList,
}