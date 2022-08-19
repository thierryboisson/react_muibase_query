import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { convertAddressDataInAddressLightView } from "../.."
import Progress from "../../../main/ui/progress/Progress"
import Table, { Attribut } from "../../../main/ui/table/Table"
import { useGetAddressByClientId } from "../client"

export const attributs: Array<Attribut> = [
    {id: "value", label: "Client Addresses"},
]

const ClientAddresses = () => {

    const {clientId} = useParams()

    const {data, isLoading} = useGetAddressByClientId({clientId})
    
    const addressesView: any = useMemo(() => data?.map(addresses => convertAddressDataInAddressLightView(addresses)),[data])

    return isLoading
        ? <Progress/>
        : addressesView.length && <Table
            data={addressesView}
            attributs={attributs}
            onSelect
        />
}

export default ClientAddresses