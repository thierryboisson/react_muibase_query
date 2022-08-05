import { useCallback, useState } from "react";

export interface Attribut {
    id: string;
    label: string;
}

export interface TableProps {
    attributs: Array<Attribut>;
    data: Array<any>;
    onSelect?: (id: number) => void
}

const Table: React.FC<TableProps> = ({attributs, data, onSelect}) => {

    const [idHover, setIdHover] = useState<number>(-1)

    const handleHover = useCallback((id: number) => {
        setIdHover(id)
    },[]) 
    const handleHoverDisable = useCallback(() => {
        setIdHover(-1)
    },[])

    const handleSelect = useCallback((id: number) => {
        if(onSelect){
            onSelect(id)
        }
    },[onSelect])

    return (
        <table>
            <thead>
                <tr>
                    {attributs.map(attribut => (
                        <th key={attribut.id}>{attribut.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody
                onMouseLeave={handleHoverDisable}
            >
                {data.map(item => (
                    <tr 
                        onClick={() => handleSelect(item["id"])}
                        className={idHover === item["id"] ? "row-selected" : ""}
                        key={item["id"]}
                        onMouseEnter={() => handleHover(item["id"])}
                    >
                        {attributs.map(attribut => (
                            <td key={`${attribut.id} ${item["id"]}`}>{item[attribut.id]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table