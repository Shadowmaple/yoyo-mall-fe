const host = 'http://127.0.0.1:4096'
const baseURL = host + '/api/v1'

const axios = require('axios')

// const SendGetRequest = (url, params, headers) => {
//     // Make a request for a user with a given ID
//     axios.get(url, {
//         params: params,
//         headers: headers,
//     })
//     .then(function (response) {
//         // handle success
//         console.log("SendGetRequest ok", response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log("SendGetRequest failed", error);
//     })
//     .then(function () {
//         // always executed
//     });
// }

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
        console.log("SendRequest ok", response);
        callback(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log("SendRequest failed", error, url, method, headers, params, data);
    })
}

export {
    baseURL,
    // SendGetRequest,
    SendRequest,
}
