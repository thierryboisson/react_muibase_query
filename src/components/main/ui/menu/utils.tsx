import { MenuItemUnstyled, menuItemUnstyledClasses } from "@mui/base";
import { styled } from "@mui/system";
import { color, spacing } from "../../theme/Theme";

export const StyledListbox = styled('ul')(
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

  export const StyledMenuItem = styled(MenuItemUnstyled)(
    () => `
    font-family: arial, sans-serif;
    list-style: none;
    padding:  8px ${spacing(4)}px;
    cursor: default;
    user-select: none;
    color: ${color.textPrimary.dark};
    font-size: 16px;
    text-align: start;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemUnstyledClasses.focusVisible} { 
        background-color: ${color.textPrimary.main};
        font-weight: 500;
        color: white;
    }

    &.item-selected { 
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