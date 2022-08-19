import { CLIENT_SERVICE_URL } from "..";
import { ApiCall, useQueryAPIDataAccess } from "../../../api_data_access";
import { ClientFullData, ClientFullResponse, ClientResponse } from "../model";

export const QUERY_GET_CLIENTS = "get_clients"
export const QUERY_GET_CLIENT = "get_client"

const getClients = () => {
    return ApiCall.get<ClientResponse>("http://localhost:8082/api/rest/clients")
}

export const useGetClients = () => {
    const {data, isLoading} =  useQueryAPIDataAccess<ClientResponse>(QUERY_GET_CLIENTS, getClients)
    return {data: data?.client_manager_client ? data.client_manager_client : [], isLoading}
}

export interface GetClientVariables {
    id?: number
}


const getClient = (variables?: GetClientVariables) => {
    return ApiCall.get<ClientFullResponse, GetClientVariables>(CLIENT_SERVICE_URL, variables?.id) 
}

export const useGetClient = ({id}: GetClientVariables): {data?: ClientFullData, isLoading: boolean } => {

    const {data, isLoading} =  useQueryAPIDataAccess<ClientFullResponse, any, GetClientVariables >(QUERY_GET_CLIENT, getClient , {
        queryOptions: {
            enabled: id !== undefined
        },
        variables: {id}
    })

    return {data: data?.client_manager_client_by_pk ? data.client_manager_client_by_pk : undefined, isLoading}
}