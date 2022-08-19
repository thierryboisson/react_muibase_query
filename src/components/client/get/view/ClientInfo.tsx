import React, { useCallback, useMemo } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { convertClientDataToClientView } from "../.."
import routes from "../../../main/routes"
import DialogConfirm from "../../../main/ui/dialog/DialogConfirm"
import { useModalService } from "../../../main/ui/dialog/Modal"
import { MenuActionItem } from "../../../main/ui/menu/MenuAction"
import PanelInfo from "../../../main/ui/panel/PanelInfo"
import Progress from "../../../main/ui/progress/Progress"
import { Attribut } from "../../../main/ui/table/Table"
import { useDeleteClient } from "../../delete/client"
import { ClientView } from "../../model"
import { useGetClient } from "../client"

export const attributs: Array<Attribut> = [
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "email", label: "Email" }
]

export const attributsLightAddress: Array<Attribut> = [
    {id: "value", label: "Client Addresses"},
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

    const confirmDelete = useCallback(() => {
        onClose()
        mutate({id})
        navigate(routes.client.path)
    },[mutate, id, onClose, navigate])

    const {data, isLoading} = useGetClient({id})

    const actions: Array<MenuActionItem> = useMemo(() => {
        const actionDefault = [
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
        }]
        if(data?.addresses.length){
            actionDefault.push( {
                id: "addressesView",
                label: "See Addresses",
                process: () => {
                    navigate('address')
                }
            })
        }
        return actionDefault
    },[navigate, onOpen, clientId, data])

    const clientView: ClientView | undefined = useMemo(() => data ? convertClientDataToClientView(data) : undefined, [data])

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
                data={clientView}
                actions={actions}
            />
            <Outlet/>
        </React.Fragment>
        : <Progress/>
}

export default ClientInfo