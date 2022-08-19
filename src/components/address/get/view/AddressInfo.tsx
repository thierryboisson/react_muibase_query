import React, { useCallback, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteClient } from "../../../client/delete/client"
import routes from "../../../main/routes"
import DialogConfirm from "../../../main/ui/dialog/DialogConfirm"
import { useModalService } from "../../../main/ui/dialog/Modal"
import { MenuActionItem } from "../../../main/ui/menu/MenuAction"
import PanelInfo from "../../../main/ui/panel/PanelInfo"
import Progress from "../../../main/ui/progress/Progress"
import { Attribut } from "../../../main/ui/table/Table"
import { useGetAddressById } from "../client"

export const attributs: Array<Attribut>=[
    {id: "street_name", label: "Street"},
    {id: "street_number", label: "Number"},
    {id: "postal_code", label: "Postal Code"},
    {id: "mail_box_name", label: "Mail box"},
    {id: "city", label: "City"},
]

const AddressInfo = () => {
    const {addressId} = useParams()
    const {open, onClose, onOpen}  =  useModalService()
    const {mutate} = useDeleteClient()
    const navigate = useNavigate()

    const {data, isLoading} = useGetAddressById({addressId})

    const id = useMemo(() => {
        if(addressId){
            return parseInt(addressId)
        } else {
            navigate(routes.address.id)
            return -1
        }
    },[addressId, navigate])

    const confirmDelete = useCallback(() => {
        onClose()
        mutate({id})
        navigate(routes.client.path)
    },[mutate, id, onClose, navigate])

    const actions: Array<MenuActionItem> = useMemo(() => {
        return [
            {
                id: "onDelete",
                label: "Delete",
                process: () => {
                    onOpen()
                }
            }]
    },[onOpen])

    return !isLoading
        ? <React.Fragment>
            <DialogConfirm
                onClose={onClose}
                onConfirm={confirmDelete}
                titel="Delete address"
                text="Are you sure to delete this address"
                open={open}
            />
            <PanelInfo
                data={data}
                attributs={attributs}
                actions={actions}
            />
        </React.Fragment>
        : <Progress/>
}

export default AddressInfo