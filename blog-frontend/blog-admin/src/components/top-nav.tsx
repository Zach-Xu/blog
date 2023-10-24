import { IconButton, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';
import { Theme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

interface Props {
    onNavOpen(): void
}

const TopNav = ({ onNavOpen }: Props) => {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

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
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }}
                >
                    {
                        !lgUp && <IconButton onClick={onNavOpen}>
                            <SvgIcon fontSize="small">
                                <Bars3Icon />
                            </SvgIcon>
                        </IconButton>
                    }
                </Stack>
            </Box>
        </>
    )
}

export default TopNav