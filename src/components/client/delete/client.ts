import { CLIENT_SERVICE_URL } from ".."
import { ApiCall, useMutationAPIDataAccess } from "../../api_data_access"
import { QUERY_GET_CLIENTS } from "../get/client"
import { ClientData } from "../model"

export interface DeleteClientVariables {
    id: number
}

export interface DeleteClientResponse {
    delete_client_manager_client_by_pk: ClientData
}

export const deleteClient = ({id}: DeleteClientVariables) => {
    return ApiCall.delete<DeleteClientVariables, DeleteClientResponse>(CLIENT_SERVICE_URL,id)
}

export const useDeleteClient = () => {
    const {mutate} = useMutationAPIDataAccess(
        deleteClient,
        {
            refetch:[
                {query: QUERY_GET_CLIENTS}
            ]
        }
    )
    return {mutate}
}