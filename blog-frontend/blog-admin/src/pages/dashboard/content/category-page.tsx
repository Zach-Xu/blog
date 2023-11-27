import { PlusIcon } from "@heroicons/react/20/solid"
import { Box, Container, Stack, Button, SvgIcon, useMediaQuery, Theme } from "@mui/material"
import { useOpenClose } from "../../../hooks/use-open-close"
import CategoryTable from "../../../components/category/category-table"
import AddCategoryModal from "../../../components/category/add-category-modal"
import SearchCategory from "../../../components/category/search-category"

const CategoryPage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const { open, handleOpen, handleClose } = useOpenClose()

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
                            <SearchCategory />
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

                        <CategoryTable />

                    </Stack>
                </Container>
            </Box>
            <AddCategoryModal
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}

export default CategoryPage