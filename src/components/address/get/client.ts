import { ADDRESS_BY_CLIENT_ID_SERVICE_URL, ADDRESS_SERVICE_URL } from ".."
import { ApiCall, useQueryAPIDataAccess } from "../../../api_data_access"
import { AddressData } from "../model"

export const QUERY_GET_ADDRESSES_BY_CLIENT = "get_addresses_by_client"
export const QUERY_GET_ADDRESS_BY_ID = "get_addresse_by_id"
export interface GetAddressByClientIdVariables {
    clientId?: number | string
}

export interface  GetAddressByClientIdResponses {
    client_manager_address: Array<AddressData>
}
export function getAddressByClientId (variables?: GetAddressByClientIdVariables){
    return ApiCall.get<GetAddressByClientIdResponses, GetAddressByClientIdVariables>(ADDRESS_BY_CLIENT_ID_SERVICE_URL, variables?.clientId)
}

export function useGetAddressByClientId ({clientId}: GetAddressByClientIdVariables): {data: Array<AddressData> | undefined, isLoading: boolean}{

    const {data, isLoading} = useQueryAPIDataAccess<GetAddressByClientIdResponses, any, GetAddressByClientIdVariables>(
        QUERY_GET_ADDRESSES_BY_CLIENT, 
        getAddressByClientId, 
        {
            queryOptions: {
                enabled: clientId !== undefined
            },
            variables: {clientId}
            
        }

    )
    return {data: data?.client_manager_address ? data.client_manager_address : [], isLoading}
}

export interface GetAddressByIdVariables {
    addressId?: number | string
}

export interface  GetAddressByIdResponses {
    client_manager_address_by_pk: Array<AddressData>
}
export function getAddressById (variables?: GetAddressByIdVariables){
    return ApiCall.get<GetAddressByIdResponses, GetAddressByIdVariables>(ADDRESS_SERVICE_URL, variables?.addressId)
}

export function useGetAddressById ({addressId}: GetAddressByIdVariables): {data: Array<AddressData> | undefined, isLoading: boolean}{

    const {data, isLoading} = useQueryAPIDataAccess<GetAddressByIdResponses, any, GetAddressByIdVariables>(
        QUERY_GET_ADDRESS_BY_ID, 
        getAddressById, 
        {
            queryOptions: {
                enabled: addressId !== undefined
            },
            variables: {addressId}
            
        }

    )
    return {data: data?.client_manager_address_by_pk ? data.client_manager_address_by_pk : [], isLoading}
}