import { GetToken, SendRequest } from "./base"

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

const RequestProductAddOrUpdate = (req, callback) => {
    let url = '/product'
    let headers = {
        token: GetToken(),
        'Content-Type': 'application/json',
    }
    let data = req
    SendRequest(url, 'post', headers, {}, data, callback)
}

const RequestProductDelete = (req, callback) => {
    let url = '/product/' + req.id
    let headers = {
        token: GetToken(),
    }
    SendRequest(url, 'delete', headers, {}, {}, callback)
}

export {
    RequestProducts,
    RequestProductSearch,
    RequestProductAddOrUpdate,
    RequestProductDelete,
}
