import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import TextField from "../../../main/ui/form/TextField";

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

const ClientForm: React.FC<ClientFormProps> = ({values, onSubmit, onCancel}) => {

    const defaultValues: ClientFormData = useMemo(() => values ? values : {firstname: "", lastname: "", email: ""}, [values])

    const {register, handleSubmit, control} = useForm({defaultValues})
    
    useEffect(() => {
        register("firstname", {validate: (value => value && value !== "")})
        register("lastname", {validate: (value => value && value !== "")})
        register("email", {validate: (value => value && value !== "")})       
    },[register])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstname"
                control={control}
                render={({field}) => (
                    <TextField 
                        controllerProps={field}
                        label="Firstname"
                    />
                )}
            />
             <Controller
                name="lastname"
                control={control}
                render={({field}) => (
                    <TextField 
                        controllerProps={field}
                        label="Lastname"
                    />
                )}
            />
             <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <TextField 
                        controllerProps={field}
                        label="Email"
                    />
                )}
            />
            <button type="submit">Submit</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    )
}

export default ClientForm