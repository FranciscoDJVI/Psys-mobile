import axiosClient from "./axiosClient";


export const GetStock = () => axiosClient.get('/Stock/')

export const GetStockById = (id: number) => axiosClient.get(`/Stock/${id}/`)

export const PostStock = (data: any) => axiosClient.post("/Stock/", data)

export const DeleteStockById = (id: number) => axiosClient.delete(`/Stock/${id}/`)

export const UpdateStock = (id: number, data: any) => axiosClient.put(`/Stock/${id}/`, data)