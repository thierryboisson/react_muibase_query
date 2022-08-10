import { ButtonUnstyled } from "@mui/base";
import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode,
    onClick?: (arg: any | undefined) => void 
}

const Button: React.FC<ButtonProps> = ({children, onClick, ...other}) => (
    <ButtonUnstyled
    onClick={onClick}
    {...other}
    >
        {children}
    </ButtonUnstyled>
)

export default Button