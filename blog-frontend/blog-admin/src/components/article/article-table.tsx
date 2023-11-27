import { Box, Button, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useCallback, useState } from 'react';
import { updatePageNum } from '../../redux/slices/tag-slice';
import AlertDialog from '../common/alert-dialog';
import { useOpenClose } from '../../hooks/use-open-close';
import { deleteArticle } from '../../redux/slices/article-slice';
import { useNavigate } from 'react-router-dom';


interface Props {
    articles: Article[],
};

const ArticleTable = ({ articles }: Props) => {

    const totalPages = useSelector((state: RootState) => state.article.totalPages)
    const currentPageNum = useSelector((state: RootState) => state.article.currentPageNum)

    const dispatch = useDispatch<AppDispatch>()

    const onPageChangeHandler = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
    }, [])

    const [selectedArticle, setSelectedArticle] = useState<Article>()

    const { open, handleOpen, handleClose } = useOpenClose()

    const handleDeleteArticle = (category: Article) => {
        setSelectedArticle(category)
        handleOpen()
    }

    const navigate = useNavigate()

    const handleEditArticle = (id: number) => {
        navigate(`/edit?id=${id}`)
    }

    const confirmDelete = useCallback(() => {
        if (selectedArticle) {
            dispatch(deleteArticle(selectedArticle.id))
        }
    }, [selectedArticle])

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
                                        Title
                                    </TableCell>
                                    <TableCell>
                                        Summary
                                    </TableCell>
                                    <TableCell>
                                        Created Time
                                    </TableCell>
                                    <TableCell>
                                        Operations
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {articles.map((article) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={article.id}
                                        >
                                            <TableCell>
                                                {article.id}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {article.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {article.summary}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {new Date(article.createdTime).toLocaleString()}
                                                </Typography>
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
                                                        onClick={() => { handleEditArticle(article.id) }}
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
                                                        onClick={() => { handleDeleteArticle(article) }}
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
                            selectedArticle &&
                            <AlertDialog
                                deleteMessage={`Are you sure to delete article: ${selectedArticle.title} ?`}
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
        </Box >
    );
};

export default ArticleTable

