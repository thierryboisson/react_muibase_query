import React, { ReactElement, useCallback, useMemo } from "react"
import Button from "../ui/button/Button"
import DialogInfo from "../ui/dialog/DialogInfo"
import Modal, { useModalService } from "../ui/dialog/Modal"
import { MenuActionItem } from "../ui/menu/MenuAction"
import { Paper } from "../ui/presentation/Paper"
import Table, { Attribut } from "../ui/table/Table"

export interface EditionViewProps {
    attributs: Array<Attribut>,
    data: Array<any>
    dataSelected: any | undefined
    onSelect: (id: number) => void
    onUpdate: () => void
    onDelete: () => void
    onDeselect: () => void
    FormCreateComponent? : ReactElement
}

const EdtionView: React.FC<EditionViewProps> = ({attributs, onDeselect, onSelect, dataSelected, data, onUpdate, onDelete, FormCreateComponent }) => {

    const {open, onClose, onOpen} = useModalService()
    const {open: openCreateForm, onOpen: onOpenCreateForm, onClose: onCloseCreateForm} = useModalService()

    const handleSelect = useCallback((id: number) => {
        onSelect(id)
        onOpen()
    },[onSelect, onOpen])

    const handleClose = useCallback(() => {
        onDeselect()
        onClose()
    },[onClose, onDeselect])

    const handleCreate = useCallback(() => {
        onDeselect()
        onOpenCreateForm()
    },[onDeselect, onOpenCreateForm])

    const handleCreateSubmit = useCallback(() => {
        onCloseCreateForm()
    },[onCloseCreateForm])

    const handleCancelCreate = useCallback(() => {
        onCloseCreateForm()
    },[onCloseCreateForm])

    const actions: Array<MenuActionItem> = useMemo(() => ([
        {
            id: "onUpdate",
            label: "Modify",
            process: () => {
                onUpdate()
                handleClose()
            }
        },
        {
            id: "onDelete",
            label: "Delete",
            process: () => {
                onDelete()
                handleClose()
            }
        }
    ]),[onDelete, onUpdate, handleClose])

    const CreateForm = useMemo(() => {
        return FormCreateComponent 
            ? React.cloneElement(FormCreateComponent, {...FormCreateComponent.props, 
                onSubmitCallback: handleCreateSubmit,
                onCancel: handleCancelCreate 
            })
            : undefined
    },[FormCreateComponent, handleCancelCreate, handleCreateSubmit])

    return <Paper>
        {FormCreateComponent && <Button onClick={handleCreate}>Create</Button>}
        <DialogInfo
            data={dataSelected}
            open={open}
            onClose={handleClose}
            attributs={attributs}
            actions={actions}
        />
        <Table
            data={data}
            attributs={attributs}
            onSelect={handleSelect}
        />
        {FormCreateComponent && 
            <Modal
                open={openCreateForm}
                onClose={onCloseCreateForm}
            >
                {CreateForm}
            </Modal>
        }
    </Paper>
}

export default EdtionView