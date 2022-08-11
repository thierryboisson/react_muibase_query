import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { QueryKeyAPIDataAccess } from "../../api_data_access";
import { ClientFullResponse, ClientResponse } from "../model";

export const QUERY_GET_CLIENTS = "get_clients"
export const QUERY_GET_CLIENT = "get_client"

const getClients = async () => {
    const res: AxiosResponse = await axios.get("http://localhost:8082/api/rest/clients")
    return res.data
}

export const useGetClients = () => {
    const {data, isLoading} =  useQuery<ClientResponse>(QUERY_GET_CLIENTS, getClients)
    return {data: data?.client_manager_client ? data.client_manager_client : [], isLoading}
}

const getClient = async (id: any) => {
    const res: AxiosResponse = await axios.get(`http://localhost:8082/api/rest/client/${id}`)
    return res.data
}

export const useGetClient = ({id}: {id: number | undefined}) => {

    const {data, isLoading} =  useQuery<ClientFullResponse>([QUERY_GET_CLIENT, id], () => getClient(id), {
        enabled: id !== undefined
    })

    return {data: data?.client_manager_client_by_pk ? data.client_manager_client_by_pk : undefined, isLoading}
}