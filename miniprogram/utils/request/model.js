const Host = "127.0.0.1:4096"
const BaseURL = "http://" + Host + "/api/v1"
const Paths = {
  category: "/category",
  login: "/user/login",
  userInfo: "/user/info",
  productList: "/product/list",
  productInfo: "/product/info/",
  productSearch: "/search/product",
  productRank: "/product/rank",
  orderCreate: "/order",
  orderUpdate: "/order",
  cartDel: "/cart",
  addrAdd: "/address",
}

module.exports = {
  Host,
  BaseURL,
  Paths,
}
