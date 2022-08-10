import { useCallback, useState } from "react"
import EdtionView from "../../../main/edition-view/EditionView"
import routes from "../../../main/routes"
import Progress from "../../../main/ui/progress/Progress"
import { Attribut } from "../../../main/ui/table/Table"
import { useDeleteClient } from "../../delete/client"
import ClientUpdateForm from "../../edit/ui/ClientUpdateForm"
import { convertClientFullDataToClientFormData } from "../../edit/utils"
import { useGetClient, useGetClients } from "../client"

export const attributs: Array<Attribut> = [
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "email", label: "Email" }
]

const ClientList = () => {
    const { data, isLoading } = useGetClients()
    const [idSelected, setIdSelected] = useState<number | undefined>(undefined)
    const { data: dataSelected } = useGetClient({ id: idSelected })
    const { mutate } = useDeleteClient()

    const handleDeselect = useCallback(() => {
        setIdSelected(undefined)
    }, [])

    const handleDelete = useCallback(() => {
        if (dataSelected) {
            mutate({ id: dataSelected.id })
        }
        handleDeselect()
    }, [dataSelected, handleDeselect, mutate])

    return isLoading
        ? <Progress />
        :
        <EdtionView
            data={data}
            attributs={attributs}
            onDeselect={handleDeselect}
            dataSelected={dataSelected}
            onDelete={handleDelete}
            createFormPath={routes.createClient.id}
            FormUpdateComponent={<ClientUpdateForm />}
            formDataConverter={convertClientFullDataToClientFormData}
        />
}

export default ClientList