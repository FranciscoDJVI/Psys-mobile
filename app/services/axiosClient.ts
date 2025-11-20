import axios from 'axios'


const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    //timeout: 1000,
    //headers: {'Content-Type': 'application/json'}
})

export default axiosClient; 