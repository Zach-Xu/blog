import { useCallback } from 'react';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { logout } from '../../redux/slices/auth-slice';


interface Props {
    anchorEl: any
    onClose(): void
    open: boolean
}

export const AccountPopover = (props: Props) => {
    const { anchorEl, onClose, open } = props;

    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.auth)

    const handleSignOut = useCallback(() => {
        onClose?.();
        dispatch(logout())

    }, [onClose]);

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            slotProps={{
                paper: { sx: { width: 200 } }
            }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    {user && user.roleName}
                </Typography>
                <Typography
                    color="text.primary"
                    variant="body2"
                >
                    {user?.username}
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                <MenuItem onClick={handleSignOut}>
                    Sign out
                </MenuItem>
            </MenuList>
        </Popover >
    );
};

