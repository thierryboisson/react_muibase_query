import React from "react"
import { Paper } from "../ui/presentation/Paper"
import Table, { Attribut } from "../ui/table/Table"

export interface EditionViewProps {
    attributs: Array<Attribut>,
    data: Array<any>
}

const EdtionView: React.FC<EditionViewProps> = ({attributs, data }) => {

    return <Paper>
        <Table
            data={data}
            attributs={attributs}
            onSelect
        />
    </Paper>
}

export default EdtionView