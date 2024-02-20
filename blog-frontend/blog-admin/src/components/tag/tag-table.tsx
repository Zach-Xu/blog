import { Box, Button, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useCallback, useEffect, useState } from 'react';
import { deleteTag, getTags, updatePageNum } from '../../redux/slices/tag-slice';
import AlertDialog from '../common/alert-dialog';
import { useOpenClose } from '../../hooks/use-open-close';
import EditTagModal from './edit-tag-modal';

export const TagsTable = () => {

    const tags = useSelector((state: RootState) => state.tag.rows)
    const totalPages = useSelector((state: RootState) => state.tag.totalPages)
    const currentPageNum = useSelector((state: RootState) => state.tag.currentPageNum)
    const searchName = useSelector((state: RootState) => state.tag.name)

    const dispatch = useDispatch<AppDispatch>()

    const onPageChangeHandler = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
    }, [])

    const [selectedTag, setSelectedTag] = useState<Tag>()

    const { open, handleOpen, handleClose } = useOpenClose()

    const editTagModal = useOpenClose()

    const deleteTagHandler = (tag: Tag) => {
        setSelectedTag(tag)
        handleOpen()
    }

    const editTagHandler = (tag: Tag) => {
        setSelectedTag(tag)
        editTagModal.handleOpen()
    }

    const confirmDelete = useCallback(() => {
        if (selectedTag) {
            dispatch(deleteTag(selectedTag.id))
            handleClose()
        }
    }, [selectedTag])

    useEffect(() => {
        dispatch(getTags({
            pageNum: currentPageNum,
            name: searchName
        }))
    }, [currentPageNum, searchName])

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
                                        Operations
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tags.map((tag) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={tag.id}
                                        >
                                            <TableCell>
                                                {tag.id}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {tag.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {tag.description}
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
                                                        onClick={() => editTagHandler(tag)}
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
                                                        onClick={() => deleteTagHandler(tag)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {
                            selectedTag &&
                            <AlertDialog
                                deleteMessage={`Are you sure to delete tag: ${selectedTag.name} ?`}
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
            <EditTagModal
                open={editTagModal.open}
                handleClose={editTagModal.handleClose}
                tag={selectedTag}
            />
        </Box >
    );
};

