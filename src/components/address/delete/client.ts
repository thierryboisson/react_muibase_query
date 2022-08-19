import { useMemo } from "react"
import { ADDRESS_SERVICE_URL } from ".."
import { ApiCall, QueryKeyAPIDataAccess, useMutationAPIDataAccess } from "../../../api_data_access"
import { QUERY_GET_ADDRESSES_BY_CLIENT } from "../get/client"
import { AddressData } from "../model"

export interface DeleteAddressByIdVariables {
    addressId?: number | string
}

export interface  DeleteAddressByIdResponses {
    client_manager_address_by_pk: Array<AddressData>
}
export function deleteAddressById (variables?: DeleteAddressByIdVariables){
    return ApiCall.delete<DeleteAddressByIdResponses, DeleteAddressByIdVariables>(ADDRESS_SERVICE_URL, variables?.addressId)
}

export function useDeleteAddressById ({clientId}:{clientId?: number}){

    const refetch: Array<QueryKeyAPIDataAccess> = useMemo(() => {
        const refetchDefault = []
        if(clientId){
            refetchDefault.push({
                query: QUERY_GET_ADDRESSES_BY_CLIENT,
                variables: {clientId}
            })
        }
        return refetchDefault
    },[clientId])

    const {mutate} = useMutationAPIDataAccess<DeleteAddressByIdResponses, any, DeleteAddressByIdVariables>(
        deleteAddressById, 
        {
            refetch
          
        }

    )
    return {mutate}
}