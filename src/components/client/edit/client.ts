import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_GET_CLIENTS } from "../get/client";
import { ClientData } from "../model";

export const createClient = async (values: ClientData) => {
    const res: AxiosResponse = await axios.post("http://localhost:8082/api/rest/client",{...values})
    return res.data
}

export const useCreateClient = () => {
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_GET_CLIENTS)
        }, 
        onError:() => {
            console.error("failed to create client")
        }
    })
    return {mutate}
}