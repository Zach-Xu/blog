import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { TableRow, TableCell, Typography, Switch, IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import { chanegMenuStatus } from '../../redux/slices/menu-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

interface Props {
    menu: Menu
    padding?: number
}

const RegularRow = ({ menu, padding = 5 }: Props) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleEnableChange = useCallback((request: ChangeStatusRequest) => {
        dispatch(chanegMenuStatus(request))
    }, [])

    return (
        <TableRow
            hover
        >
            <TableCell>
                <Typography variant="subtitle2" sx={{ pl: padding }}>
                    {menu.name}
                </Typography>
            </TableCell>
            <TableCell>
                {menu.displayOrder}
            </TableCell>
            <TableCell>
                {menu.permission}
            </TableCell>
            <TableCell>
                {menu.routerPath || ''}
            </TableCell>
            <TableCell>
                <Switch
                    checked={menu.enable}
                    onChange={() => handleEnableChange({
                        id: menu.id,
                        enable: !menu.enable
                    })}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </TableCell>
        </TableRow>
    )
}

const MenuRow = ({ menu, padding = 5 }: Props) => {

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>()

    const handleEnableChange = useCallback((request: ChangeStatusRequest) => {
        dispatch(chanegMenuStatus(request))
    }, [])

    return (
        !(menu.subMenus && menu.subMenus.length > 0) ?
            <RegularRow menu={menu} padding={padding} />
            :
            <>
                <TableRow
                    hover
                >
                    <TableCell sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: padding - 5,
                        gap: 2
                    }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                        </IconButton>
                        <Typography variant="subtitle2">
                            {menu.name}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        {menu.displayOrder}
                    </TableCell>
                    <TableCell>
                        {menu.permission}
                    </TableCell>
                    <TableCell>
                        {menu.routerPath || ''}
                    </TableCell>
                    <TableCell>
                        <Switch
                            checked={menu.enable}
                            onChange={() => handleEnableChange({
                                id: menu.id,
                                enable: !menu.enable
                            })}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </TableCell>
                </TableRow>
                {
                    open &&
                    menu.subMenus.map(sMenu => (
                        <MenuRow key={sMenu.id} menu={sMenu} padding={padding + 3} />
                    ))
                }
            </>
    )
}


export default MenuRow