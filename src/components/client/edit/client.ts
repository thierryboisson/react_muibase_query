import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
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

export const createClient = async (values: CreateClientVariables) => {
    const res: AxiosResponse = await axios.post("http://localhost:8082/api/rest/client", values)
    return res.data
}

export const useCreateClient = () => {
    const queryClient = useQueryClient()
    const {mutate} = useMutation<CreateClientResponse, any, CreateClientVariables>(
        createClient,
        {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_GET_CLIENTS)
        }, 
        onError:() => {
            console.error("failed to create client")
        }
    })
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


export const updateClient = async (values: UpdateClientVariables) => {
    const res: AxiosResponse = await axios.put("http://localhost:8082/api/rest/client", values)
    return res.data
}

export const useUdpateClient = ({id}:{id: number}) => {
    const queryClient = useQueryClient()
    const {mutate} = useMutation<UpdateClientResponse, any, UpdateClientVariables>(
        updateClient,
        {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_GET_CLIENTS)
            queryClient.invalidateQueries([QUERY_GET_CLIENT, id])
        }, 
        onError:() => {
            console.error("failed to create client")
        }
    })
    return {mutate}
}