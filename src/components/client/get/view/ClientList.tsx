import EdtionView from "../../../main/edition-view/EditionView"
import Progress from "../../../main/ui/progress/Progress"
import { Attribut } from "../../../main/ui/table/Table"
import { useGetClients } from "../client"

export const attributs: Array<Attribut> = [
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "email", label: "Email" }
]

const ClientList = () => {
    const { data, isLoading } = useGetClients()

    return isLoading
        ? <Progress />
        :
        <EdtionView
            data={data}
            attributs={attributs}
        />
}

export default ClientList