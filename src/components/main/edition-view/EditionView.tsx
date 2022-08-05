import React, { ReactElement, useCallback, useMemo } from "react"
import Button from "../ui/button/Button"
import DialogConfirm from "../ui/dialog/DialogConfirm"
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
    onDelete: () => void
    onDeselect: () => void
    FormCreateComponent? : ReactElement
    FormUpdateComponent? : ReactElement
    formDataConverter?: (data: any) => any 
}

const EdtionView: React.FC<EditionViewProps> = ({attributs, onDeselect, onSelect, dataSelected, data, onDelete, FormCreateComponent, FormUpdateComponent, formDataConverter }) => {

    const {open: openInfo, onClose: onCloseInfo, onOpen: onOpenInfo} = useModalService()
    const {open: openCreateForm, onOpen: onOpenCreateForm, onClose: onCloseCreateForm} = useModalService()
    const {open: openUpdateForm, onOpen: onOpenUpdateForm, onClose: onCloseUpdateForm} = useModalService()
    const {open: openDeleteConfirm, onOpen: onOpenDeleteConfirm, onClose: onCloseDeleteConfirm} = useModalService()

    const handleSelect = useCallback((id: number) => {
        onSelect(id)
        onOpenInfo()
    },[onSelect, onOpenInfo])

    const handleClose = useCallback(() => {
        onDeselect()
        onCloseInfo()
    },[onCloseInfo, onDeselect])

    const handleCreate = useCallback(() => {
        onDeselect()
        onOpenCreateForm()
    },[onDeselect, onOpenCreateForm])

    const handleUpdate = useCallback(() => {
        onCloseInfo()
        onOpenUpdateForm()
    },[onCloseInfo, onOpenUpdateForm])

    const handleDelete = useCallback(() => {
        onOpenDeleteConfirm()
    },[onOpenDeleteConfirm])

    const handleDeleteConfirm = useCallback(() => {
        onDelete()
        onDeselect()
        onCloseDeleteConfirm()
    }, [onDelete, onCloseDeleteConfirm, onDeselect])


    const actions: Array<MenuActionItem> = useMemo(() => ([
        {
            id: "onUpdate",
            label: "Modify",
            process: () => {
                handleUpdate()
            }
        },
        {
            id: "onDelete",
            label: "Delete",
            process: () => {
                handleDelete()
                handleClose()
            }
        }
    ]),[handleDelete, handleUpdate, handleClose])

    const formData = useMemo(() => {
        if(dataSelected){
            return formDataConverter
                ? formDataConverter(dataSelected)
                : dataSelected
        }
        return undefined
    },[dataSelected, formDataConverter])

    const idSelected = useMemo(() => dataSelected && dataSelected.id, [dataSelected])

    const CreateForm = useMemo(() => {
        return FormCreateComponent 
            ? React.cloneElement(FormCreateComponent, {...FormCreateComponent.props, 
                onSubmitCallback: onCloseCreateForm,
                onCancel: onCloseCreateForm 
            })
            : undefined
    },[FormCreateComponent, onCloseCreateForm])

    const UpdateForm = useMemo(() => {
        return FormUpdateComponent 
            ? React.cloneElement(FormUpdateComponent, {...FormUpdateComponent.props, 
                onSubmitCallback: (onCloseUpdateForm),
                onCancel: onCloseUpdateForm,
                formData,
                idSelected 
            })
            : undefined
    },[FormUpdateComponent, formData, onCloseUpdateForm, idSelected])


    return <Paper>
        {FormCreateComponent && <Button onClick={handleCreate}>Create</Button>}
        <DialogInfo
            data={dataSelected}
            open={openInfo}
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
        {FormUpdateComponent && 
            <Modal
                open={openUpdateForm}
                onClose={onCloseUpdateForm}
            >
                {UpdateForm}
            </Modal>
        }
        <DialogConfirm
            titel="Delete item"
            text="Are you sure to delete this item"
            onClose={onCloseDeleteConfirm}
            onConfirm={handleDeleteConfirm}
            open={openDeleteConfirm}
        />
    </Paper>
}

export default EdtionView