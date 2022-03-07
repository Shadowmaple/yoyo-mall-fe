import { GetToken, SendRequest } from "./base"

const RequestCouponList = (req, callback) => {
    let url = "/coupon/admin"
    let headers = {
        token: GetToken(),
    }
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestCouponAdd = (req, callback) => {
    let url = '/coupon'
    let headers = {
        token: GetToken(),
        'Content-Type': 'application/json',
    }
    let data = req
    SendRequest(url, 'post', headers, {}, data, callback)
}

const RequestCouponDelete = (req, callback) => {
    let url = '/coupon'
    let headers = {
        token: GetToken(),
    }
    SendRequest(url, 'delete', headers, req, {}, callback)
}

export {
    RequestCouponList,
    RequestCouponAdd,
    RequestCouponDelete,
}
