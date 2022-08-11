import axios, { AxiosRequestConfig, AxiosResponse } from "axios"


export function formatUrlWithParams(url: string, params?: string | number): string{
    return params ? `${url}/${params}` : url
}

export function get<TData = unknown, TVariables = unknown>(url: string, params?: string | number, config?: AxiosRequestConfig<TVariables>): Promise<TData>{
    return new Promise<TData>((resolve) => {
        axios.get<TData,AxiosResponse<TData>,TVariables>(formatUrlWithParams(url, params), config).then(res => resolve(res.data)).catch(error => console.error(error))
    })
}

export function post<TVariables = unknown, TData = unknown, >(url: string, variables: TVariables, config?: AxiosRequestConfig<TVariables>): Promise<TData>{
    return new Promise<TData>((resolve) => {
        axios.post<TData,AxiosResponse<TData>,TVariables>(url, variables, config).then(res => resolve(res.data)).catch(error => console.error(error))
    })
}

export function put<TVariables = unknown, TData = unknown, >(url: string, variables: TVariables, config?: AxiosRequestConfig<TVariables>): Promise<TData>{
    return new Promise<TData>((resolve) => {
        axios.put<TData,AxiosResponse<TData>,TVariables>(url, variables, config).then(res => resolve(res.data)).catch(error => console.error(error))
    })
}

export function deleteCall<TData = unknown, TVariables = unknown>(url: string, params?: string | number, config?: AxiosRequestConfig<TVariables>): Promise<TData>{
    return new Promise<TData>((resolve) => {
        axios.delete<TData,AxiosResponse<TData>,TVariables>(formatUrlWithParams(url, params), config).then(res => resolve(res.data)).catch(error => console.error(error))
    })
}

const ApiCall =  {
    get,
    put,
    post,
    delete: deleteCall
} 
export default ApiCall