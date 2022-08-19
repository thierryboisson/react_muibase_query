import { AddressData, AddressLightView } from "./model";

export const ADDRESS_BY_CLIENT_ID_SERVICE_URL = "http://localhost:8082/api/rest/client_address" 
export const ADDRESS_SERVICE_URL = "http://localhost:8082/api/rest/address"

export function convertAddressDataInAddressLightView (data: AddressData): AddressLightView {
    const {id, street_name, street_number, postal_code, city, mail_box_name} = data
    return {id, value: `${street_name} ${street_number} ${postal_code} ${city} ${mail_box_name ? mail_box_name : ""}`}
}