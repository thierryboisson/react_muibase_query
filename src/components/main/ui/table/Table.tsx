import React, { useCallback, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export interface Attribut {
    id: string;
    label: string;
}

export interface TableProps {
    attributs: Array<Attribut>;
    data: Array<any>;
    onSelect?: boolean
}

const Table: React.FC<TableProps> = ({attributs, data, onSelect}) => {

    const [idHover, setIdHover] = useState<number>(-1)

    const handleHover = useCallback((id: number) => {
        setIdHover(id)
    },[]) 
    const handleHoverDisable = useCallback(() => {
        setIdHover(-1)
    },[])

    return (
       <React.Fragment>
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
                            className={idHover === item["id"] ? "row-selected" : ""}
                            key={item["id"]}
                            onMouseEnter={() => handleHover(item["id"])}
                        >
                            {attributs.map(attribut => (
                                <td key={`${attribut.id} ${item["id"]}`}>
                                    {onSelect
                                        ? <Link to={item["id"].toString()}>{item[attribut.id]}</Link>
                                        : item[attribut.id]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {onSelect && <Outlet/>}
       </React.Fragment>
    )
}

export default Table