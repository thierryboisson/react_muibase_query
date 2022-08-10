import { useCallback, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import routes from "../../../main/routes"
import { useGetClient } from "../../get/client"
import { useUdpateClient } from "../client"
import { convertClientFullDataToClientFormData } from "../utils"
import ClientForm, { ClientFormData } from "./ClientForm"

export interface CreateclientFormProps {
    onSubmitCallback?: () => void 
    onCancel?: () => void    
} 

const ClientUpdateForm: React.FC<CreateclientFormProps> = ({onSubmitCallback, onCancel}) => {

    const {clientId} = useParams()
    const navigate = useNavigate()

    const id = useMemo(() => {
        if(clientId){
            return parseInt(clientId)
        } else {
            navigate(routes.client.path)
            return -1
        }
    },[navigate, clientId])

    const {mutate} = useUdpateClient({id})

    const {data} = useGetClient({id})
    const formData = useMemo(() => data ? convertClientFullDataToClientFormData(data) : undefined ,[data])
    const handleSubmit = useCallback((values: ClientFormData) => {
        if(id !== -1){
            mutate({...values, id})
            if(onSubmitCallback){
                onSubmitCallback()
            }
        }
    }, [onSubmitCallback, mutate, id])
    return <ClientForm
        onSubmit={handleSubmit}
        onCancel={onCancel}
        values={formData}
    />
}

export default ClientUpdateForm