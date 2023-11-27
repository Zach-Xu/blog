import { Box, Button, Stack, SvgIcon, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useCallback, useEffect, useState } from 'react';
import { updatePageNum } from '../../redux/slices/tag-slice';
import AlertDialog from '../common/alert-dialog';
import { useOpenClose } from '../../hooks/use-open-close';
import { changeCategoryStatus, deleteCategory, getCategories, getParentCategories } from '../../redux/slices/category-slice';
import EditCategoryModal from './edit-category-modal';

const CategoryTable = () => {

    const dispatch = useDispatch<AppDispatch>()

    const onPageChangeHandler = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
    }, [])

    const [selectedCategory, setSelectedCategory] = useState<Category>()

    const { open, handleOpen, handleClose } = useOpenClose()

    const editCategoryModal = useOpenClose()

    const deleteTagHandler = (category: Category) => {
        setSelectedCategory(category)
        handleOpen()
    }

    const editCategoryHandler = (category: Category) => {
        setSelectedCategory(category)
        editCategoryModal.handleOpen()
    }

    const handleEnableChange = async (request: ChangeStatusRequest) => {
        dispatch(changeCategoryStatus(request))
    }

    const confirmDelete = useCallback(() => {
        if (selectedCategory) {
            dispatch(deleteCategory(selectedCategory.id))
        }
    }, [selectedCategory])

    const { rows: categories, currentPageNum, totalPages } = useSelector((state: RootState) => state.category)

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
        <Box
            component='main'
        >
            <Stack
                spacing={5}
                sx={{
                    px: 2
                }}
            >
                <Scrollbar>
                    <Box sx={{
                        minWidth: 800,
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        id
                                    </TableCell>
                                    <TableCell>
                                        Tag name
                                    </TableCell>
                                    <TableCell>
                                        description
                                    </TableCell>
                                    <TableCell>
                                        enable
                                    </TableCell>
                                    <TableCell>
                                        Operations
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                <TableBody>
                                    {categories.map((category) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={category.id}
                                            >
                                                <TableCell>
                                                    {category.id}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2">
                                                        {category.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {category.description}
                                                </TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={category.enable}
                                                        onChange={() => handleEnableChange({
                                                            id: category.id,
                                                            enable: !category.enable
                                                        })}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Stack
                                                        spacing={2}
                                                        direction='row'
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={(
                                                                <SvgIcon fontSize="small">
                                                                    <PencilSquareIcon />
                                                                </SvgIcon>
                                                            )}
                                                            sx={{
                                                                bgcolor: 'white',
                                                                '&:hover': {
                                                                    bgcolor: 'white'
                                                                }
                                                            }}
                                                            onClick={() => editCategoryHandler(category)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<DeleteIcon />}
                                                            color='error'
                                                            sx={{
                                                                bgcolor: 'white',
                                                                '&:hover': {
                                                                    bgcolor: 'white'
                                                                }
                                                            }}
                                                            onClick={() => deleteTagHandler(category)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            }

                        </Table>
                        {
                            selectedCategory &&
                            <AlertDialog
                                deleteMessage={`Are you sure to delete category: ${selectedCategory.name} ?`}
                                open={open}
                                handleClose={handleClose}
                                confirmAction={confirmDelete}
                            />
                        }

                    </Box>
                </Scrollbar>
                <CustomPagination
                    totalPages={totalPages}
                    currentPageNum={currentPageNum + 1}
                    pageSize={5}
                    onChangeHandler={onPageChangeHandler}
                />
            </Stack>

            <EditCategoryModal
                open={editCategoryModal.open}
                handleClose={editCategoryModal.handleClose}
                item={selectedCategory}
            />

        </Box >
    );
};

export default CategoryTable

