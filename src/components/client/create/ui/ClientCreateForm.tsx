import { useCallback } from "react"
import ClientForm, { ClientFormData } from "./ClientForm"

export interface CreateclientFormProps {
    onSubmitCallback?: () => void 
    onCancel?: () => void
} 

const ClientCreateForm: React.FC<CreateclientFormProps> = ({onSubmitCallback, onCancel}) => {
    const handleSubmit = useCallback((values: ClientFormData) => {
        console.log(values)
        if(onSubmitCallback){
            onSubmitCallback()
        }
    }, [onSubmitCallback])
    return <ClientForm
        onSubmit={handleSubmit}
        onCancel={onCancel}
    />
}

export default ClientCreateForm