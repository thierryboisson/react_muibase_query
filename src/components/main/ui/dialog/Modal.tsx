import { ModalUnstyled } from "@mui/base";
import clsx from "clsx";
import React, { ReactNode, useCallback, useState } from 'react'
export interface BackdropUnstyledProps {
    open?: boolean; 
}

export const Backdrop = React.forwardRef<
  HTMLDivElement,
  BackdropUnstyledProps
>((props, ref) => {
  
  const { open, ...other } = props;
  return (
    <div
      className={clsx({'MuiBackdrop-open': open }, "modal-backdrop")}
      ref={ref}
      {...other}
    />
  );
});

export interface ModalProps {
    open: boolean;
    onClose: () => void
    children: ReactNode
}

export const useModalService = (): {open: boolean, onOpen: () => void, onClose: () => void, onSwitch: () => void} => {
    const [open, setOpen] = useState<boolean>(false)

    const onOpen = useCallback(() => {
        setOpen(true)
    },[])

    const onClose = useCallback(() => {
        setOpen(false)
    },[])

    const onSwitch = useCallback(() => {
        setOpen((currentValue => !currentValue))
    },[])

    return {open, onOpen, onClose, onSwitch}
}

const Modal: React.FC<ModalProps> = ({open, onClose, children, ...other}) => {

    return (
        <ModalUnstyled
            open={open}
            onClose={onClose}
        >
            <div className="modal-backdrop">
                <div className="modal-container">
                    <div className="modal">
                        {children}
                    </div>
                </div>
            </div>
        </ModalUnstyled>
        
    )
}



export default Modal