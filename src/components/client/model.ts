import { AddressData, AddressLightView } from "../address/model";
import { PrestationData } from "../prestation/model";

export interface ClientData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface ClientResponse {
    client_manager_client: Array<ClientData>
}

export interface ClientFullData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    addresses: Array<AddressData>;
    prestations: Array<PrestationData>

}

export interface ClientFullResponse {
    client_manager_client_by_pk: ClientFullData
}

export interface ClientView {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    addresses: Array<AddressLightView>;
}