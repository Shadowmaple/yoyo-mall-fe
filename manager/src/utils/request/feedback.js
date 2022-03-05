import { SendRequest } from "./base"

const token = ''

const RequestFeedback = (req, callback) => {
    let url = '/feedback'
    let headers = {
        token: token,
    }
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestFeedbackRead = (req, callback) => {
    let url = '/feedback/read'
    let headers = {
        token: token,
    }
    let data = req
    SendRequest(url, 'post', headers, {}, data, callback)
}

export {
    RequestFeedback,
    RequestFeedbackRead,
}
