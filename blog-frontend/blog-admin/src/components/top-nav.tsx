import { Avatar, IconButton, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';
import { Theme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Path from './path';
import { usePopover } from '../hooks/use-popover';
import { AccountPopover } from './account-popover/account-popover';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

interface Props {
    onNavOpen(): void
}

const TopNav = ({ onNavOpen }: Props) => {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    const { path } = useSelector((state: RootState) => state.router)

    const { user } = useSelector((state: RootState) => state.auth)

    const accountPopover = usePopover();

    return (
        <>
            <Box
                component='header'
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                    sx={lgUp ? {
                        minHeight: TOP_NAV_HEIGHT,
                        px: 5
                    } : {
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }
                    }
                >
                    {
                        !lgUp && <IconButton onClick={onNavOpen}>
                            <SvgIcon fontSize="small">
                                <Bars3Icon />
                            </SvgIcon>
                        </IconButton>
                    }
                    <Stack
                        alignItems="center"
                        direction="row"
                        width='100%'
                        justifyContent='space-between'
                        spacing={2}
                    >
                        <Path path={path} />
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40
                            }}
                            src={user?.avatar || "/assets/avatars/avatar-anika-visser.png"}
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    )
}

export default TopNav