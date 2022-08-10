import { MenuActionItem } from "../menu/MenuAction";
import PanelInfo from "../panel/PanelInfo";
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
        <PanelInfo
            data={data}
            actions={actions}
            attributs={attributs}
            onCancel={onClose}
        />
    </Modal>
}

export default DialogInfo