import { MenuUnstyledContext, MenuUnstyledContextType, useMenu, useMenuItem } from '@mui/base';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
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
    props: React.ComponentPropsWithoutRef<'li'> & {selected?: boolean},
    ref: React.Ref<any>,
) {
    const { children, selected, ...other } = props;

    const { getRootProps, disabled } = useMenuItem({ ref });

    const classes = {
        'item-selected': selected,
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

export interface NavbarProps {
    actions: NavBarActions
}

const NavBar: React.FC<NavbarProps> = ({actions}) => {

    const [menuSelectedId, setMenuSelectedId] = useState<string>(actions[0].id)

    const onSelect = useCallback((id: string) => {
        setMenuSelectedId(id)
    },[])

    return (
      <React.Fragment>
        <Menu>
           {actions.map(({label, id, path}) => (
             <Link key={id} onClick={() => onSelect(id)} to={path}><MenuItem selected={id === menuSelectedId}>{label}</MenuItem></Link>
           ))}
        </Menu>
      </React.Fragment>
    );
  }

  export default NavBar