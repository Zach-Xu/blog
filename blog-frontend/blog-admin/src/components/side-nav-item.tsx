
import SingleLevelMenu from './menu/single-level-menu';
import NestedMenu from './menu/nested-menu';
import { List } from '@mui/material';
import { useEffect, useState } from 'react';
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
                        !m.subMenus ?
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