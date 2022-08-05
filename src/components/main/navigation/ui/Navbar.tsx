import { MenuUnstyledContext, MenuUnstyledContextType, useMenu, useMenuItem } from '@mui/base';
import clsx from 'clsx';
import React from 'react'
import { StyledMenuItem } from '../../ui/menu/utils';

const Menu = React.forwardRef(function Menu(
    props: React.ComponentPropsWithoutRef<'ul'>,
    ref: React.Ref<HTMLUListElement>,
) {
    const { children, ...other } = props;

    const {
        registerItem,
        unregisterItem,
        getListboxProps,
        getItemProps,
        getItemState,
    } = useMenu({
        listboxRef: ref,
    });

    const contextValue: MenuUnstyledContextType = {
        registerItem,
        unregisterItem,
        getItemState,
        getItemProps,
        open: true,
    };

    return (
        <ul className="menu-root" {...other} {...getListboxProps()}>
            <MenuUnstyledContext.Provider value={contextValue}>
                {children}
            </MenuUnstyledContext.Provider>
        </ul>
    );
});

const MenuItem = React.forwardRef(function MenuItem(
    props: React.ComponentPropsWithoutRef<'li'>,
    ref: React.Ref<any>,
) {
    const { children, ...other } = props;

    const { getRootProps, disabled, focusVisible } = useMenuItem({ ref });

    const classes = {
        'focus-visible': focusVisible,
        'menu-item': true,
        disabled,
    };

    return (
        <StyledMenuItem className={clsx(classes)} {...other} {...getRootProps()}>
            {children}
        </StyledMenuItem>
    );
});

export type NavBarActions = Array<NavBarAction> 

export interface NavBarAction {
    label: string
    id: string
    path: string
}

const navbarActions: NavBarActions = [
    {label: "Client", id: "client", path: "/client"},
    {label: "Addresse", id: "addresse", path: "/addresse"},
    {label: "Prestation", id: "prestation", path: "/prestation"}
]

export default function NavBar() {
    return (
      <React.Fragment>
        <Menu>
           {navbarActions.map(({label, id}) => (
             <MenuItem key={id}>{label}</MenuItem>
           ))}
        </Menu>
      </React.Fragment>
    );
  }