import { ClientFormData } from "../ui/ClientForm";
import { ClientFullData, ClientData } from '../../model'

export const convertClientFullDataToClientFormData = (data: ClientFullData): ClientFormData => {
    const {firstname, lastname, email } = data
    return {firstname, lastname, email}
}

export const convertClientFormDataToCLientData = (formData: ClientFormData, id: number): ClientData => {
    return {...formData, id}
}