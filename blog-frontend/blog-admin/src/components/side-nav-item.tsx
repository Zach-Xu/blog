
import { menu } from '../data/menu';
import SingleLevelMenu from './menu/single-level-menu';
import NestedMenu from './menu/nested-menu';
import { List } from '@mui/material';

const SideNavItem = () => {

    const menus = menu.data

    return (
        <>
            <List
                sx={{ width: '100%', bgcolor: '' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    menus.map(m => (
                        m.subMenus.length == 0 ?
                            <SingleLevelMenu key={m.id} menu={m} />
                            :
                            <NestedMenu key={m.id} menu={m} subMenus={m.subMenus} />
                    ))
                }

            </List>
        </>
    )

}

export default SideNavItem