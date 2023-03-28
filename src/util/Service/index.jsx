import cookie from 'js-cookie';
import axios from 'axios';
import {message,} from 'antd';

const baseURI = 'http://10.147.20.124:81'

const ajaxService = axios.create({
    baseURL: baseURI,
    withCredentials: true,
    headers: {
        // 'Content-Type':'application/json;charset=UTF-8',
    }
});

ajaxService.interceptors.request.use((config) => {
    const token = cookie.get('tianpeng-token');
    config.headers.common.Authorization = token || '';
    return config;
}, (error) => {
    return error;
});

ajaxService.interceptors.response.use((response) => {
    if (response.status !== 200) {
        throw new Error('网络错误');
    }
    response = response.data;
    const errCode = typeof response.errCode !== 'undefined' ? parseInt(response.errCode, 0) : 0;
    if (errCode !== 0) {
        if (errCode === 1502) {

            throw new Error(response.message);
        } else if (errCode === 1001) {
            return response;
        } else if (errCode !== 200) {
            message.error(response.message);
        }
        throw new Error(response.message);
    }
    return response;
}, (error) => {
    // message.error('请求超时！');
    // if (error.errCode !== 0) {
    throw new Error(error.message);
    // }
    // return error;
});

const requestService = () => {
    return {
        ajaxService
    };
};

export const request = ajaxService;
export default requestService;
