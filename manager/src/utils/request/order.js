import { GetToken, SendRequest } from "./base"

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY1NjUyODYsImlkIjoxLCJuYmYiOjE2NDY1NjUyODYsIm9wZW5faWQiOiIiLCJyb2xlIjoxfQ.KVVo15VBVq0J2vtgcuIqswcheMlgwks2NW7pZ-O_7lg'

const RequestOrders = (req, callback) => {
    let url = '/order/admin/list'
    let headers = {
        token: GetToken(),
    }
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestOrderUpdate = (req, callback) => {
    let url = '/order/' + Number(req.id)
    let headers = {
        token: GetToken(),
    }
    let data = {
        status: 2,
    }
    SendRequest(url, 'put', headers, req, data, callback)
}

export {
    RequestOrders,
    RequestOrderUpdate,
}
