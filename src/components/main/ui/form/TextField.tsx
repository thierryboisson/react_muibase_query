import { ControllerRenderProps } from "react-hook-form"

export interface TextFieldProps {
    controllerProps: ControllerRenderProps<any, any>,
    label?: string
}
const TextField: React.FC<TextFieldProps> = ({controllerProps, label}) => {
    return <div className="input-container">
        <div><label className="input-label">{label}</label></div>
        <div><input {...controllerProps}></input></div>
    </div>
} 

export default TextField