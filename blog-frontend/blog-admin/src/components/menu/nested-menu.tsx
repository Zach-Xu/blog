import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedMenu } from '../../redux/slices/menu-slice';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

interface Props {
    menu: Menu
}

const NestedMenu = ({ menu }: Props) => {

    const [open, setOpen] = useState(true)

    const navigate = useNavigate()

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

    const handleSubMenuClick = (menu: Menu) => {
        dispatch(updateSelectedMenu({
            id: menu.id
        }))

        menu.routerPath && navigate(menu.routerPath)
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
                {open ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        menu.subMenus && menu.subMenus.map(sMenu => (
                            <ListItemButton
                                key={sMenu.id}
                                onClick={() => handleSubMenuClick(sMenu)}
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