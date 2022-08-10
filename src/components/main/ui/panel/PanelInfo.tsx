import React from "react";
import Button from "../button/Button";
import MenuAction, { MenuActionItem } from "../menu/MenuAction";
import { Attribut } from "../table/Table";

export interface PanelInfoProps {
    data: any;
    attributs: Array<Attribut>
    onCancel: () => void;
    actions?: Array<MenuActionItem>
}

const PanelInfo: React.FC<PanelInfoProps> = ({attributs, data, onCancel, actions}) => {

    return (
        <React.Fragment>
            <div>
                {attributs.map(attribut => (
                    data && data[attribut.id] && <h4 key={attribut.id}>{attribut.label}: {data[attribut.id]}</h4>
                ))}
            </div>
            <div className="dialog-button-container">
                {actions && <MenuAction
                    options={actions}
                />}
                <Button onClick={(onCancel)}>Close</Button>
            </div>
        </React.Fragment>
    )
}

export default PanelInfo