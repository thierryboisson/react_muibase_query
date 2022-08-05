import { useCallback } from "react"
import { useUdpateClient } from "../client"
import ClientForm, { ClientFormData } from "./ClientForm"

export interface CreateclientFormProps {
    onSubmitCallback?: () => void 
    onCancel?: () => void
    formData?: ClientFormData
    idSelected?: number
} 

const ClientUpdateForm: React.FC<CreateclientFormProps> = ({onSubmitCallback, onCancel, formData, idSelected}) => {
    const {mutate} = useUdpateClient()
    const handleSubmit = useCallback((values: ClientFormData) => {
        if(idSelected){
            mutate({...values, id: idSelected})
            if(onSubmitCallback){
                onSubmitCallback()
            }
        }
    }, [onSubmitCallback, mutate, idSelected])
    return <ClientForm
        onSubmit={handleSubmit}
        onCancel={onCancel}
        values={formData}
    />
}

export default ClientUpdateForm