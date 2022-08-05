import { ClientData } from "../client/model";

export interface AddressData {
    id: number;
    street_name: string;
    street_number: string;
    postal_code: string;
    city: string;
    mail_box_name: string;
    client?: ClientData
}