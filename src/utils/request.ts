import axios from 'axios'

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        const data = response.data
        if (data.code !== 200) return Promise.reject(data?.msg)
        return data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const getApi = <T>(url: string, params?: T): Promise<ResponseData> => request.get(url, { params })
export const postApi = <T>(url: string, data?: T): Promise<ResponseData> => request.post(url, data)
export const putApi = <T>(url: string, data?: T): Promise<ResponseData> => request.put(url, data)
export const deleteApi = (url: string): Promise<ResponseData> => request.delete(url)
export const patchApi = <T>(url: string, data?: T): Promise<ResponseData> => request.patch(url, data)

export default request
