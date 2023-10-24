import { Box, Divider, Theme, Typography, useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer'
import SideNavItem from './side-nav-item';

interface Props {
    open: boolean,
    onClose(): void
}

const SideNav = ({ open, onClose }: Props) => {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    return (
        <Drawer
            anchor="left"
            open={lgUp ? true : open}
            onClose={lgUp ? undefined : onClose}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.800',
                    color: 'common.white',
                    width: 280
                }
            }}
            sx={lgUp ? { bgcolor: 'black' } : { zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant={lgUp ? "permanent" : "temporary"}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    bgcolor: '#1c2536'
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                            p: '12px'
                        }}
                    >
                        <div>
                            <Typography
                                color="inherit"
                                variant="subtitle1"
                            >
                                Blog
                            </Typography>
                            <Typography
                                color="neutral.400"
                                variant="body2"
                            >
                                Admin dashboard
                            </Typography>
                        </div>

                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'neutral.700', bgcolor: '#2f3746' }} />
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <SideNavItem />
                </Box>
            </Box>
        </Drawer>
    )
}

export default SideNav