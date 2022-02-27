const Host = "127.0.0.1:4096"
const BaseURL = "http://" + Host + "/api/v1"
const Paths = {
  category: "/category",
  login: "/login",
  userInfo: "/user/info",
  productList: "/product/list",
  productInfo: "/product/info/",
  productSearch: "/search/product",
  productRank: "/product/rank",
  orderList: '/order/list',
  orderInfo: '/order/info/',
  orderCreate: "/order",
  orderUpdate: "/order/",
  cart: '/cart',
  address: "/address",
  collection: '/collection',
  like: '/like',
  evaluationList: '/evaluation/list',
  evaluationCreate: '/evaluation',
  coupon: '/coupon',
  couponPrivate: '/coupon/private',
  couponPublic: '/coupon/public',
  feedback: '/feedback',
  logistics: '/logistics',
}

module.exports = {
  Host,
  BaseURL,
  Paths,
}
