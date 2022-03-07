import { GetToken, SendRequest } from "./base"

const RequestFeedback = (req, callback) => {
    let url = '/feedback'
    let headers = {
        token: GetToken(),
    }
    SendRequest(url, 'get', headers, req, {}, callback)
}

const RequestFeedbackRead = (req, callback) => {
    let url = '/feedback/read'
    let headers = {
        token: GetToken(),
    }
    let data = req
    SendRequest(url, 'post', headers, {}, data, callback)
}

export {
    RequestFeedback,
    RequestFeedbackRead,
}
