import { Box, Container, Stack, Theme, useMediaQuery } from "@mui/material"
import MenuTable from "../../../components/menu/menu-table"
import SearchMenu from "../../../components/menu/search-menu"

const MenuPage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 2
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    spacing={3}
                >
                    <Stack
                        sx={
                            mdUp ?
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 2
                                } :
                                {
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    rowGap: 2,
                                    px: 2
                                }
                        }
                    >
                        <SearchMenu />
                    </Stack>
                    <MenuTable />

                </Stack>
            </Container>
        </Box>
    )
}


export default MenuPage