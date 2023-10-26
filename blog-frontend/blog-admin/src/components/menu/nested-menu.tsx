import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedMenu } from '../../redux/slices/menu-slice';
import { RootState } from '../../redux/store';
import { updateRouterPath } from '../../redux/slices/router-path-slice';

interface Props {
    menu: Menu
    subMenus: Menu[]
}

const NestedMenu = ({ menu, subMenus }: Props) => {

    const [open, setOpen] = useState(true)

    const dispatch = useDispatch()

    const { selectedMenuId } = useSelector((state: RootState) => state.menu)

    const handleClick = () => {
        setOpen(!open);
        if (selectedMenuId !== null) {
            dispatch(updateSelectedMenu({
                id: null
            }))
        }
    }

    const selectMenu = (menu: Menu) => {
        dispatch(updateSelectedMenu({
            id: menu.id
        }))
        dispatch(updateRouterPath({
            path: menu.component
        }))
    }

    return (
        <>
            < ListItemButton
                onClick={handleClick}
                sx={{
                    mx: 2,
                    '&:hover': {
                        backgroundColor: '#252e3e'
                    },
                }}
            >
                {/* <ListItemIcon>
                    <SendIcon />
                </ListItemIcon> */}
                <ListItemText primary={menu.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        subMenus.map(sMenu => (
                            <ListItemButton
                                key={sMenu.id}
                                onClick={() => selectMenu(sMenu)}
                                selected={selectedMenuId === sMenu.id}
                                sx={{
                                    pl: 4,
                                    mx: 2,
                                    mt: 0.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#252e3e'
                                    },
                                }}
                            >
                                {/* <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon> */}
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: '0.95rem'
                                    }}
                                    primary={sMenu.name}
                                    sx={{ color: '#9da4ae' }}
                                />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </>
    )
}

export default NestedMenu