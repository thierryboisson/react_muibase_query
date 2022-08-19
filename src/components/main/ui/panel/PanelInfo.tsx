import React from "react";
import MenuAction, { MenuActionItem } from "../menu/MenuAction";
import { Attribut } from "../table/Table";

export interface PanelInfoProps {
    data: any;
    attributs: Array<Attribut>
    actions?: Array<MenuActionItem>
}

const PanelInfo: React.FC<PanelInfoProps> = ({attributs, data, actions}) => {

    return (
        <React.Fragment>
            <div className="dialog-button-container">
                {actions && <MenuAction
                    options={actions}
                />}

            </div>
            <div>
                {attributs.map(attribut => (
                    data && data[attribut.id] && <h4 key={attribut.id}>{attribut.label}: {data[attribut.id]}</h4>
                ))}
            </div>
        </React.Fragment>
    )
}

export default PanelInfo