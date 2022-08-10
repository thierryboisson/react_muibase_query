import React, { useCallback, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import routes from "../../../main/routes"
import DialogConfirm from "../../../main/ui/dialog/DialogConfirm"
import { useModalService } from "../../../main/ui/dialog/Modal"
import { MenuActionItem } from "../../../main/ui/menu/MenuAction"
import PanelInfo from "../../../main/ui/panel/PanelInfo"
import Progress from "../../../main/ui/progress/Progress"
import { Attribut } from "../../../main/ui/table/Table"
import { useDeleteClient } from "../../delete/client"
import { useGetClient } from "../client"

export const attributs: Array<Attribut> = [
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "email", label: "Email" }
]



const ClientInfo = () => {
 
    const { clientId } = useParams()
    const navigate = useNavigate()
    const {mutate} = useDeleteClient()
    const {open, onClose, onOpen}  =  useModalService()

    const id = useMemo(() => {
        if(clientId){
            return parseInt(clientId)
        } else {
            navigate(routes.client_manager.id)
            return -1
        }
    },[clientId, navigate])

    const handleCancel = useCallback(() => {
        navigate(routes.client.id)
    },[navigate])

    const confirmDelete = useCallback(() => {
        onClose()
        mutate({id})
        navigate(routes.client.path)
    },[mutate, id, onClose, navigate])

    const actions: Array<MenuActionItem> = useMemo(() => ([
        {
            id: "onUpdate",
            label: "Modify",
            process: () => {
                navigate(`${routes.updateClient.path}/${clientId}`)
            }
        },
        {
            id: "onDelete",
            label: "Delete",
            process: () => {
                onOpen()
            }
        }
    ]),[navigate, onOpen, clientId])

    const {data, isLoading} = useGetClient({id})

    return !isLoading
        ? <React.Fragment>
            <DialogConfirm
                onClose={onClose}
                onConfirm={confirmDelete}
                titel="Delete client"
                text="Are you sure to delete this client"
                open={open}
            />
            <PanelInfo
            attributs={attributs}
            data={data}
            onCancel={handleCancel}
            actions={actions}
        />
        </React.Fragment>
        : <Progress/>
}

export default ClientInfo