import { useMemo, useState } from "react"
import { useGetClients } from "../client"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "../../../main/ui/form/TextField";

export interface ClientSelectMenuProps {
    onChange: (id: number) => void
}

const ClientSelectMenu : React.FC<ClientSelectMenuProps>= ({onChange}) => {

    const {data} = useGetClients()
    const [value, setValue] = useState<any>(undefined)

    const handleChange = (_event: any, newValue: {label: string, id: number}) => {
        onChange(newValue.id)
        setValue(newValue)
    }

    const options = useMemo(() => data.map(({firstname, lastname, id}) => ({label: `${firstname} ${lastname}`, id})),[data])

    return (
        <Autocomplete
          disablePortal
          id="client-select"
          options={options}
          sx={{ width: 300 }}
          onChange={handleChange}
          value={value}
          renderInput={(params) => <TextField controllerProps={params} label="Client" />}
        />
      );

}

export default ClientSelectMenu