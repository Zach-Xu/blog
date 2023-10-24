import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedMenu } from '../../redux/slices/menuslice';
import { RootState } from '../../redux/store';


interface Menu {
    id: number
    name: string
    parentId: number
    displayOrder: number
    routerPath: string
    component: null | string
    frame: boolean
    menuType: string
    visible: boolean
    status: string
    permission: null | string
    icon: null | string
}

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

    const selectMenu = (id: number) => {
        dispatch(updateSelectedMenu({
            id
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
                                onClick={() => selectMenu(sMenu.id)}
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