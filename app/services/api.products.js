import axiosClient from "./axiosClient";

export const GetProducts = () => axiosClient.get("Products/");

export const GetProductById = (id) => axiosClient.get(`Products/${id}/`);

export const PostProducts = (product) => axiosClient.post("Products/", product);

export const DeleteProduct = (id) => axiosClient.delete(`Products/${id}/`);

export const UpdateProduct = (id, product) => axiosClient.put(`Products/${id}/`, product);