import { useCallback } from "react"
import { useCreateClient } from "../client"
import ClientForm, { ClientFormData } from "./ClientForm"

export interface CreateclientFormProps {
    onSubmitCallback?: () => void 
    onCancel?: () => void
} 

const ClientCreateForm: React.FC<CreateclientFormProps> = ({onSubmitCallback, onCancel}) => {
    const {mutate} = useCreateClient()
    const handleSubmit = useCallback((values: ClientFormData) => {
        mutate(values)
        if(onSubmitCallback){
            onSubmitCallback()
        }
    }, [onSubmitCallback, mutate])
    return <ClientForm
        onSubmit={handleSubmit}
        onCancel={onCancel}
    />
}

export default ClientCreateForm