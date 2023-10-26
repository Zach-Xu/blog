import { useCallback } from 'react';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


interface Props {
    anchorEl: any
    onClose(): void
    open: boolean
}

export const AccountPopover = (props: Props) => {
    const { anchorEl, onClose, open } = props;

    const navigate = useNavigate()

    const { user } = useSelector((state: RootState) => state.auth)

    const handleSignOut = useCallback(
        () => {
            onClose?.();
            // ToDo: dispatch logout action
            navigate('/login')
        },
        [onClose]
    );

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
                    {user && user.roles.length > 0 && user.roles[0].roleName}
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

