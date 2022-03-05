import { SendRequest } from "./base"

const RequestProducts = (req, callback) => {
    let url = "/product/list"
    let headers = {}
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestProductSearch = (req, callback) => {
    let url = '/search/product'
    let headers = {}
    SendRequest(url, 'get', headers, req, {}, callback)
}

export {
    RequestProducts,
    RequestProductSearch,
}
