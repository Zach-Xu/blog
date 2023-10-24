import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { useState } from 'react'


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
}

const SingleLevelMenu = ({ menu }: Props) => {

    return (
        <>
            < ListItemButton
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
            </ListItemButton>
        </>
    )
}

export default SingleLevelMenu