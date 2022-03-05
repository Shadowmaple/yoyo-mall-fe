import { SendRequest } from "./base"

const token = ''

const RequestOrders = (req, callback) => {
    let url = '/order/admin/list'
    let headers = {
        token: token,
    }
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestOrderUpdate = (req, callback) => {
    let url = '/order/' + Number(req.id)
    let headers = {
        token: token,
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
