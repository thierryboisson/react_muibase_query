import { MenuItemUnstyled, menuItemUnstyledClasses, MenuUnstyled, MenuUnstyledActions, PopperUnstyled } from "@mui/base";
import { styled } from "@mui/system";
import { useCallback, useRef, useState } from "react";
import { color, spacing } from "../../theme/Theme";

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

const StyledListbox = styled('ul')(
    () => `
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: ${spacing(2)} 0;
    min-width: 200px;
    background-color: ${color.textPrimary.light};
    color: ${color.textPrimary.main};
    overflow: auto;
    outline: 0px;
    `,
  );

  const StyledMenuItem = styled(MenuItemUnstyled)(
    () => `
    font-family: arial, sans-serif;
    list-style: none;
    padding: 8px;
    cursor: default;
    user-select: none;
    color: ${color.textPrimary.dark};
    font-size: 16px;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemUnstyledClasses.focusVisible} { 
        background-color: ${color.textPrimary.main};
        font-weight: 500;
        color: white;
    }
  
    &.${menuItemUnstyledClasses.disabled} {
        background-color: ${color.grey[300]};
        color: ${color.grey[600]};
    }
  
    &:hover:not(.${menuItemUnstyledClasses.disabled}) {
        background-color: ${color.textPrimary.main};
        font-weight: 500;
        color: white;
    }
    `,
  );

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
             <StyledMenuItem key={option.id} onClick={option.process}>
                {option.label}
            </StyledMenuItem>
        ))}
      </MenuUnstyled>
    </div>
  )

}

export default MenuAction

