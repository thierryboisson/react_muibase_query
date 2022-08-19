import { MenuUnstyled, MenuUnstyledActions, PopperUnstyled } from "@mui/base";
import { styled } from "@mui/system";
import { useCallback, useRef, useState } from "react";
import { StyledListbox, StyledMenuItem } from "./utils";

export interface MenuActionItem {
    id: string;
    label: string;
    process: () => void
}

export interface MenuActionProps {
    options: Array<MenuActionItem>
}

const Popper = styled(PopperUnstyled)`
    z-index: 1400;
`;

const MenuAction: React.FC<MenuActionProps> = ({options}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuActions = useRef<MenuUnstyledActions>(null);

  const handleButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  },[isOpen])

  const handleButtonKeyDown = useCallback( (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  },[])

  const close = useCallback( () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  },[])

  return (
    <div>
        <button
            type="button"
            onClick={handleButtonClick}
            onKeyDown={handleButtonKeyDown}
            ref={buttonRef}
            aria-controls={isOpen ? 'simple-menu' : undefined}
            aria-expanded={isOpen || undefined}
            aria-haspopup="menu"
        >
            Action
        </button>
        <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        components={{ Root: Popper, Listbox: StyledListbox }}
        componentsProps={{ listbox: { id: 'simple-menu' } }}
      >
        {options.map(option => (
             <StyledMenuItem key={option.id} onClick={() => {
              option.process()
              setAnchorEl(null)
             }}>
                {option.label}
            </StyledMenuItem>
        ))}
      </MenuUnstyled>
    </div>
  )

}

export default MenuAction

