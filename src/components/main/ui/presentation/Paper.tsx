import { ReactNode } from "react"

export interface PaperProps {
    children: ReactNode
}

export const Paper: React.FC<PaperProps> = ({children}) => {
   return (
    <div className="paper-container">
        <div className="paper">
            {children}
        </div>
    </div>
   ) 
}