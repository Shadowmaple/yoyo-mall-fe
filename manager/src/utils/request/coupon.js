import { SendRequest } from "./base"

const token = ''

const RequestCouponList = (req, callback) => {
    let url = "/coupon/admin"
    let headers = {
        token: token,
    }
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestCouponAdd = (req, callback) => {
    let url = '/coupon'
    let headers = {
        token: token,
    }
    let data = req
    SendRequest(url, 'post', headers, {}, data, callback)
}

const RequestCouponDelete = (req, callback) => {
    let url = '/coupon'
    let headers = {
        token: token,
    }
    SendRequest(url, 'delete', headers, req, {}, callback)
}

export {
    RequestCouponList,
    RequestCouponAdd,
    RequestCouponDelete,
}
