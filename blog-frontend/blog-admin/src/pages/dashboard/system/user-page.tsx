import { PlusIcon } from "@heroicons/react/20/solid"
import { Box, Container, Stack, Button, SvgIcon, useMediaQuery, Theme } from "@mui/material"
import { useOpenClose } from "../../../hooks/use-open-close"
import SearchUser from "../../../components/user/search-user"
import UserTable from "../../../components/user/user-table"
import AddUserModal from "../../../components/user/add-user-modal"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../redux/store"
import { getAllActiveRoles } from "../../../redux/slices/user-slice"

const UserPage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const { open, handleOpen, handleClose } = useOpenClose()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllActiveRoles())
    }, [])

    return (
        <>
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
                            <SearchUser />
                            <Box
                                sx={mdUp ? {
                                    ml: 2
                                } : {}}
                            >
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Stack>

                        <UserTable />

                    </Stack>
                </Container>
            </Box>
            <AddUserModal
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}

export default UserPage