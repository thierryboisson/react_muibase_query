import { CLIENT_SERVICE_URL } from "..";
import {ApiCall, useMutationAPIDataAccess} from "../../../api_data_access"
import { QUERY_GET_CLIENT, QUERY_GET_CLIENTS } from "../get/client";
import { ClientData } from "../model";

export interface CreateClientVariables {
    firstname: string;
    lastname: string;
    email: string;
}

export interface CreateClientResponse {
    insert_client_manager_client: ClientData
}    

export const createClient = (values: CreateClientVariables) => {
    return ApiCall.post<CreateClientVariables, CreateClientResponse>(CLIENT_SERVICE_URL, values)
}

export const useCreateClient = () => {
    const {mutate} = useMutationAPIDataAccess<CreateClientResponse, any, CreateClientVariables>(
        createClient,
        {
            refetch:[{
                query: QUERY_GET_CLIENTS
            }]
        }
    )
    return {mutate}
}

export interface UpdateClientVariables {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface UpdateClientResponse {
    update_client_manager_client_by_pk: ClientData
}    


export const updateClient = (values: UpdateClientVariables) => {
   return ApiCall.put<UpdateClientVariables, UpdateClientResponse>(CLIENT_SERVICE_URL, values)
}

export const useUdpateClient = ({id}:{id: number}) => {
    const {mutate} = useMutationAPIDataAccess<UpdateClientResponse, any, UpdateClientVariables>(
        updateClient,
        {
            refetch:[{
                query: QUERY_GET_CLIENTS
            },{
                query: QUERY_GET_CLIENT,
                variables: {clientId: id}
            }]
        })
       
    return {mutate}
}