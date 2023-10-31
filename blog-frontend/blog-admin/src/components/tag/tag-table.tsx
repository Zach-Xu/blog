import { Box, Button, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useCallback, useState } from 'react';
import { deleteTag, updatePageNum } from '../../redux/slices/tag-slice';
import AlertDialog from '../common/alert-dialog';
import { useOpenClose } from '../../hooks/use-open-close';
import EditTagModal from './edit-tag-modal';


interface Props {
    tags: Tag[],
};


export const TagsTable = ({ tags }: Props) => {

    const { totalPages, currentPageNum } = useSelector((state: RootState) => state.tag)

    const dispatch = useDispatch<AppDispatch>()

    const onPageChangeHandler = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
    }, [])

    const [selectedTag, setSeletedTag] = useState<Tag>()

    const { open, handleOpen, handleClose } = useOpenClose()

    const editTagModal = useOpenClose()

    const deleteTagHandler = (tag: Tag) => {
        setSeletedTag(tag)
        handleOpen()
    }

    const editTagHandler = (tag: Tag) => {
        setSeletedTag(tag)
        editTagModal.handleOpen()
    }

    const confirmDelete = useCallback(() => {
        if (selectedTag) {
            dispatch(deleteTag(selectedTag.id))
        }
    }, [selectedTag])

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
                        <AlertDialog
                            open={open}
                            handleClose={handleClose}
                            tagName={selectedTag?.name}
                            confirmAction={confirmDelete}
                        />
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

