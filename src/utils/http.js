import axios from 'axios'

const http = axios.create({
    timeout: 1000 * 30,
    baseURL: '/proxyapi',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

/**
 * 拦截请求配置
 */
http.interceptors.request.use((config) => {
    config.headers = config.headers = {}
    config.headers['token'] = localStorage.getItem('token')
    return config
})


/**
 * 拦截响应内容
 */
http.interceptors.response.use((response) => {
    return response
})

export default http