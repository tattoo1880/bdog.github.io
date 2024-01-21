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


export default service
export { service2 }