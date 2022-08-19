import { convertAddressDataInAddressLightView } from "../address"
import { ClientFullData, ClientView } from "./model"

const CLIENT_SERVICE_URL = "http://localhost:8082/api/rest/client"


export {
    CLIENT_SERVICE_URL
}

export function convertClientDataToClientView (data: ClientFullData): ClientView {
    const {addresses, prestations: _prestations, ...rest} =  data
    const addressesConverted = addresses.map(address => convertAddressDataInAddressLightView(address))
    return {...rest, addresses: addressesConverted} 
}