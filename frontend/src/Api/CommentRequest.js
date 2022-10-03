import axios from 'axios'


const API = axios.create({ baseURL: "http://localhost:5000" })


export const uploadComment = (id, data) => API.post(`post/${id}/comment`, data)

export const getComment = (id) => API.get(`post/${id}/getcomment`)