import axios from 'axios'

const service = axios.create({
    baseURL: 'https://work.daweichuanmei.club/api',
    // baseURL: 'http://localhost:8000',
    timeout: 5000
})

const service2 = axios.create({
    baseURL: 'https://work.daweichuanmei.club/apii',
    timeout: 500000
})


export default service
export { service2 }