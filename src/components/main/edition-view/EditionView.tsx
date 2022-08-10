import React, { ReactElement, useCallback, useMemo } from "react"
import { Link, Outlet } from "react-router-dom"
import Button from "../ui/button/Button"
import DialogConfirm from "../ui/dialog/DialogConfirm"
import Modal, { useModalService } from "../ui/dialog/Modal"
import { Paper } from "../ui/presentation/Paper"
import Table, { Attribut } from "../ui/table/Table"

export interface EditionViewProps {
    attributs: Array<Attribut>,
    data: Array<any>
    dataSelected: any | undefined
    onDelete: () => void
    onDeselect: () => void
    createFormPath?: string
    FormUpdateComponent? : ReactElement
    formDataConverter?: (data: any) => any 
}

const EdtionView: React.FC<EditionViewProps> = ({attributs, onDeselect, dataSelected, data, onDelete, createFormPath, FormUpdateComponent, formDataConverter }) => {

    const {open: openUpdateForm, onOpen: onOpenUpdateForm, onClose: onCloseUpdateForm} = useModalService()
    const {open: openDeleteConfirm, onOpen: onOpenDeleteConfirm, onClose: onCloseDeleteConfirm} = useModalService()

    const handleUpdate = useCallback(() => {
        onOpenUpdateForm()
    },[onOpenUpdateForm])

    const handleDelete = useCallback(() => {
        onOpenDeleteConfirm()
    },[onOpenDeleteConfirm])

    const handleDeleteConfirm = useCallback(() => {
        onDelete()
        onDeselect()
        onCloseDeleteConfirm()
    }, [onDelete, onCloseDeleteConfirm, onDeselect])

    const formData = useMemo(() => {
        if(dataSelected){
            return formDataConverter
                ? formDataConverter(dataSelected)
                : dataSelected
        }
        return undefined
    },[dataSelected, formDataConverter])

    const idSelected = useMemo(() => dataSelected && dataSelected.id, [dataSelected])

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
        {createFormPath && <Button ><Link to={createFormPath}>Create</Link></Button>}
        <Table
            data={data}
            attributs={attributs}
        />
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
        <Outlet/>
    </Paper>
}

export default EdtionView