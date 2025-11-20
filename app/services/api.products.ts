import axiosClient from "./axiosClient";

export const GetProducts = () => axiosClient.get("Products/");

export const GetProductById = (id: number) => axiosClient.get(`Products/${id}/`);

export const PostProducts = (product: any) => axiosClient.post("Products/", product);

export const DeleteProduct = (id: number) => axiosClient.delete(`Products/${id}/`);

export const UpdateProduct = (id: number, product: any) => axiosClient.put(`Products/${id}/`, product);