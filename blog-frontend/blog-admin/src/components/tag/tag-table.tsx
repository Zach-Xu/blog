import { Box, Button, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useCallback } from 'react';
import { getTags, updatePageNum } from '../../redux/slices/tag-slice';

interface Props {
    tags: Tag[],
};

export const TagsTable = ({ tags }: Props) => {

    const { totalPages, currentPageNum } = useSelector((state: RootState) => state.tag)

    const dispatch = useDispatch<AppDispatch>()

    const onChangeHandler = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
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
                    </Box>
                </Scrollbar>
                <CustomPagination
                    totalPages={totalPages}
                    currentPageNum={currentPageNum + 1}
                    pageSize={5}
                    onChangeHandler={onChangeHandler}
                />
            </Stack>
        </Box >
    );
};

