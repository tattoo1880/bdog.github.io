import axios from 'axios'

const service = axios.create({
    // baseURL: 'http://45.147.48.43/api',
    baseURL: 'http://localhost:8000',
    timeout: 5000
})



export default service
