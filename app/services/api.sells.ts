import axiosClient from "./axiosClient";

export const GetSells = () => axiosClient.get("/Sell/")

export const GetSellsById = (id: number) => axiosClient.get(`Sell/${id}/`);

export const PostSells = (sell: any) => axiosClient.post("Sell/", sell);

export const DeleteSells = (id: number) => axiosClient.delete(`Sell/${id}/`);

export const UpdateSells = (id: number, sell: any) => axiosClient.put(`Sell/${id}/`, sell);





