import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"

export interface ClientFormProps {
    values?: ClientFormData,
    onSubmit: (values:ClientFormData) => void 
    onCancel?: () => void
}

export interface ClientFormData {
    firstname: string;
    lastname: string;
    email: string;
}

export const convertClientDataToClientFormData = (data: ClientFormData) => {
    const {firstname, lastname, email} = data
    return {firstname, lastname, email}
} 
const ClientForm: React.FC<ClientFormProps> = ({values, onSubmit, onCancel}) => {

    const defaultValues: ClientFormData = useMemo(() => values ? values : {firstname: "", lastname: "", email: ""}, [values])

    const {register, unregister, handleSubmit, control} = useForm({defaultValues})
    
    useEffect(() => {
        register("firstname", {required: true})
        register("lastname", {required: true})
        register("email", {required: true})
        
        return () => {
            unregister("firstname")
            unregister("lastname")
            unregister("email")
        }
    },[register, unregister])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstname"
                control={control}
                render={({field}) => (
                    <input {...field}></input>
                )}
            />
             <Controller
                name="lastname"
                control={control}
                render={({field}) => (
                    <input {...field}></input>
                )}
            />
             <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <input {...field}></input>
                )}
            />
            <button type="submit">Submit</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    )
}

export default ClientForm