import { PlusIcon } from "@heroicons/react/20/solid"
import { Box, Container, Stack, Button, SvgIcon, useMediaQuery, Theme } from "@mui/material"
import Loading from "../../../components/common/loading"
import DashboardLayout from "../../../layouts/dashboard/layout"
import { useOpenClose } from "../../../hooks/use-open-close"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { useEffect } from "react"
import { getCategories, getParentCategories } from "../../../redux/slices/category-slice"
import CategoryTable from "../../../components/category/category-table"
import AddCategoryModal from "../../../components/category/add-category-modal"
import SearchCategory from "../../../components/category/search-category"

const CategoryPage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const { open, handleOpen, handleClose } = useOpenClose()


    const { isLoading } = useSelector((state: RootState) => state.loading)
    const { rows: categories, currentPageNum } = useSelector((state: RootState) => state.category)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getCategories({
            pageNum: currentPageNum
        }))
    }, [currentPageNum])

    useEffect(() => {
        const fetchParentCategories = async () => {
            dispatch(getParentCategories())
        }
        fetchParentCategories()
    }, [])


    return (
        <DashboardLayout>
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
                        {
                            isLoading ?
                                <Loading />
                                :
                                <CategoryTable categories={categories} />
                        }
                    </Stack>
                </Container>
            </Box>
            <AddCategoryModal
                open={open}
                handleClose={handleClose}
            />
        </DashboardLayout>
    )
}

export default CategoryPage