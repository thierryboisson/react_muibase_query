import React, { useCallback, useState } from "react"
import EdtionView from "../../../main/edition-view/EditionView"
import { Attribut } from "../../../main/ui/table/Table"
import ClientCreateForm from "../../create/ui/ClientCreateForm"
import { useGetClient, useGetClients } from "../client"

export const attributs: Array<Attribut> = [
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "email", label: "Email" }
]

const ClientList = () => {
    const { data, isLoading } = useGetClients()
    const [idSelected, setIdSelected] = useState<number | undefined>(undefined)
    const { data: dataSelected} = useGetClient({id: idSelected})

    const handleSelect = useCallback((idToSelect: number) => {
        setIdSelected(idToSelect)
    }, [])

    const handleDeselect = useCallback(() => {
        setIdSelected(undefined)
    }, [])

    const handleUpdate = useCallback(() => {
        if (dataSelected) {
            console.log('UPDATE ' + dataSelected.id)
        }
        handleDeselect()
    }, [dataSelected, handleDeselect])

    const handleDelete = useCallback(() => {
        if (dataSelected) {
            console.log("Delete " + dataSelected.id)
        }
        handleDeselect()
    }, [dataSelected, handleDeselect])

    return isLoading
        ? <div>...Loading</div>
        :
       <React.Fragment>
             <EdtionView
                data={data}
                attributs={attributs}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                dataSelected={dataSelected}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                FormCreateComponent={<ClientCreateForm/>}
            />
       </React.Fragment>
}

export default ClientList