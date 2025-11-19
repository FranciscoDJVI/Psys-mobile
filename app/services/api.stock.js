import axiosClient from "./axiosClient";


export const GetStock = () => axiosClient.get('/Stock')
