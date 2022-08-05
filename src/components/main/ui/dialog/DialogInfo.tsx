import Button from "../button/Button";
import MenuAction, { MenuActionItem } from "../menu/MenuAction";
import { Attribut } from "../table/Table";
import Modal from "./Modal";

export interface DialogInfoProps {
    data: any;
    attributs: Array<Attribut>
    open: boolean;
    onClose: () => void;
    actions: Array<MenuActionItem>
}

const DialogInfo: React.FC<DialogInfoProps> = ({data, actions, open, attributs, onClose}) => {

    return <Modal
        open={open}
        onClose={onClose}
    >
        <div>
            {attributs.map(attribut => (
                data && data[attribut.id] && <h4 key={attribut.id}>{attribut.label}: {data[attribut.id]}</h4>
            ))}
        </div>
        <div className="dialog-button-container">
            <MenuAction
                options={actions}
            />
            <Button onClick={(onClose)}>Close</Button>
        </div>
    </Modal>
}

export default DialogInfo