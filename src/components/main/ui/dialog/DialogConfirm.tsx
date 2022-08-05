import Modal from "./Modal"

export interface DialogConfirmProps {
    titel?: string, 
    text: string, 
    open: boolean, 
    onClose: () => void, 
    onConfirm: () => void
}
const DialogConfirm: React.FC<DialogConfirmProps> = ({titel, text, open, onClose, onConfirm}) => {

    return <Modal
        open={open}
        onClose={onClose}
    >
        <h3>{titel}</h3>
        <p>{text}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
    </Modal>
}

export default DialogConfirm