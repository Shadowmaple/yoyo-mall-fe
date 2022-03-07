import { SendRequest } from "./base"

const RequestLogin = (req, callback) => {
    let url = '/login/admin'
    let headers = {
        'Content-Type': 'application/json',
    }
    let data = req
    SendRequest(url, 'post', headers, {}, data, callback)
}

export {
    RequestLogin,
}
