import { GetToken, SendRequest } from "./base"

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY1NjUyODYsImlkIjoxLCJuYmYiOjE2NDY1NjUyODYsIm9wZW5faWQiOiIiLCJyb2xlIjoxfQ.KVVo15VBVq0J2vtgcuIqswcheMlgwks2NW7pZ-O_7lg'

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
