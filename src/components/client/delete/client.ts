import axios, { AxiosResponse } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { QUERY_GET_CLIENTS } from "../get/client"
import { ClientData } from "../model"

export interface DeleteClientVariables {
    id: number
}

export interface DeleteClientResponse {
    delete_client_manager_client_by_pk: ClientData
}

export const deleteClient = async ({id}: DeleteClientVariables) => {
    const res: AxiosResponse = await axios.delete(`http://localhost:8082/api/rest/client/${id}`)
    return res.data
}

export const useDeleteClient = () => {
    const queryClient = useQueryClient()
    const {mutate} = useMutation<DeleteClientResponse, any, DeleteClientVariables>(
        deleteClient,
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