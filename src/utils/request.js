import axios from 'axios'
import {Message} from 'element-ui'
import authToken from './authToken'
import router from '@/router';
axios.interceptors.request.use(config => {
    let token = authToken.getToken();
    if (token) {
        config.headers[authToken.TokenKey] = token;
    }
    // console.log("real request url ==> ", config.url);
    return config;
}, err => {
    Message.error('请求超时!');
    return Promise.resolve(err);
});
axios.interceptors.response.use(data => {
    let res = data.data;
    if (res.ret) {
        if (res.result) {
            return Promise.resolve(res.result);
        } else {
            Message.error(res.result.msg);
        }
    } else {
        Message.error('服务内部错误');

        // 401  go login and remove  cookie
        if(res.code === 401){
            authToken.removeToken();
            localStorage.clear();
            router.push("/login");
        }
        return Promise.reject(res);
    }


}, err => {
    return Promise.reject(err);
});
const request  = {
    post: (url, params) => {
        return axios({
            method: 'post',
            url: `${url}`,
            data: params,
            transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    get:(url, params) => {
        return axios({
            method: 'get',
            url: `${url}`,
            data: params,
        });
    }

};
export default request;




