import { useCallback } from "react"
import ClientForm, { ClientFormData } from "./ClientForm"

export interface CreateclientFormProps {
    onSubmitCallback?: () => void 
    onCancel?: () => void
    formData?: ClientFormData
} 

const ClientUpdateForm: React.FC<CreateclientFormProps> = ({onSubmitCallback, onCancel, formData}) => {
    const handleSubmit = useCallback((values: ClientFormData) => {
        if(onSubmitCallback){
            onSubmitCallback()
        }
    }, [onSubmitCallback])
    return <ClientForm
        onSubmit={handleSubmit}
        onCancel={onCancel}
        values={formData}
    />
}

export default ClientUpdateForm