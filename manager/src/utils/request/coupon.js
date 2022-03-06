import { GetToken, SendRequest } from "./base"

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY1NjUyODYsImlkIjoxLCJuYmYiOjE2NDY1NjUyODYsIm9wZW5faWQiOiIiLCJyb2xlIjoxfQ.KVVo15VBVq0J2vtgcuIqswcheMlgwks2NW7pZ-O_7lg'

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
