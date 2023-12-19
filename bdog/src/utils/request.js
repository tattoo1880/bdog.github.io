import axios from 'axios'

const service = axios.create({
    baseURL: 'http://45.147.48.43/api',
    timeout: 5000
})



export default service
