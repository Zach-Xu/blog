import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import SideNav from '../../components/side-nav';
import TopNav from '../../components/top-nav';
import AuthGuard from '../../components/auth-guard';
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';


const SIDE_NAV_WIDTH = '280px';

const Layout = () => {
    const [openNav, setOpenNav] = useState(false);

    const theme = useTheme()

    return (
        <AuthGuard>
            <TopNav onNavOpen={() => setOpenNav(true)} />
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
            <Box
                component='main'
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    maxWidth: '100%',
                    [theme.breakpoints.up('lg')]: {
                        paddingLeft: SIDE_NAV_WIDTH
                    },
                }}

            >
                <Box
                    component='div'
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}

                >
                    {/* {children} */}
                    <Outlet />
                </Box>
            </Box>
        </AuthGuard>
    )
}

export default Layout