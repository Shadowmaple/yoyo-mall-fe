const host = 'http://124.222.171.153:4096'
// const host = 'http://127.0.0.1:4096'
const baseURL = host + '/api/v1'

const axios = require('axios')

const SendRequest = (url, method, headers, params, data, callback) => {
    axios({
        baseURL: baseURL,
        url: url,
        method: method,
        headers: headers,
        params: params,
        data: data,
        timeout: 5000,
    })
    .then(function (response) {
        // handle success
        console.log("SendRequest ok", response.data);
        callback(response.data)
    })
    .catch(function (error) {
        // handle error
        console.error("SendRequest failed", error, url, method, headers, params, data);
    })
}

const GetToken = () => {
    return localStorage.getItem('token') || ''
}

export {
    SendRequest,
    GetToken,
}
