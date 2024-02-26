import axios from 'axios'

const service = axios.create({
    baseURL: 'http://45.147.48.43/api',
    // baseURL: 'http://localhost:8000',
    timeout: 5000
})

const service2 = axios.create({
    baseURL: 'http://45.147.48.43/apii',
    timeout: 500000
})

const service3 = axios.create({
    baseURL: 'http://45.147.48.43:8080',
    // baseURL: 'http://127.0.0.1:8080',
    timeout: 50000,
})

const service4 = axios.create({
    // baseURL: 'http://127.0.0.1:8080',
    baseURL: 'http://45.147.48.43:8080',
    timeout: 50000,
})

const service5 = axios.create({
    // baseURL: 'http://127.0.0.1:8080/channel',
    baseURL: 'http://45.147.48.43:8080/channel',
    timeout: 50000,
})

const service6 = axios.create({
    baseURL: 'http://127.0.0.1:8080/download',
    // baseURL: 'http://45.147.48.43:8080/download',
    timeout: 50000,
})

export default service
export { service2,service3,service4,service5,service6}