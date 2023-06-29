import axios from "axios";

// create an axios instance
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
});

// request interceptor
request.interceptors.request.use(
    (config) => {
        console.log("Starting proxy middleware");
        console.log(process.env.REACT_APP_BASE_API);
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// response interceptor
request.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;
