
import SingleLevelMenu from './menu/single-level-menu';
import NestedMenu from './menu/nested-menu';
import { List } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { menuService } from '../services/resources/menu-service';

const SideNavItem = () => {

    const [menus, setMenus] = useState<Menu[]>([])

    useEffect(() => {
        const fetchMenus = async () => {
            const result = await menuService.getUserMenus()
            setMenus(result)
        }
        fetchMenus()
    }, [])

    return (
        <>
            <List
                sx={{ width: '100%', bgcolor: '' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    menus.map(m => (
                        !m.visible ? <Fragment key={m.id} ></Fragment>
                            :
                            !(m.subMenus && m.subMenus.length > 0) ?
                                <SingleLevelMenu key={m.id} menu={m} />
                                :
                                <NestedMenu key={m.id} menu={m} />
                    ))
                }

            </List>
        </>
    )

}

export default SideNavItem