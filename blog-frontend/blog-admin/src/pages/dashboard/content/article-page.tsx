import { PlusIcon } from "@heroicons/react/20/solid"
import { Box, Container, Stack, Button, SvgIcon, useMediaQuery, Theme } from "@mui/material"
import Loading from "../../../components/common/loading"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { useEffect } from "react"
import { getArticles } from "../../../redux/slices/article-slice"
import ArticleTable from "../../../components/article/article-table"
import SearchArticle from "../../../components/article/search-article"
import { useNavigate } from "react-router-dom"

const ArticlePage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const { isLoading } = useSelector((state: RootState) => state.loading)
    const { rows: articles, currentPageNum } = useSelector((state: RootState) => state.article)
    const search = useSelector((state: RootState) => state.article.search)

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getArticles({
            pageNum: currentPageNum,
            ...search
        }))
    }, [currentPageNum, search])

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
                        <SearchArticle />
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
                                onClick={() => navigate('/write')}
                            >
                                Add
                            </Button>
                        </Box>
                    </Stack>
                    {
                        isLoading ?
                            <Loading />
                            :
                            <ArticleTable articles={articles} />
                    }
                </Stack>
            </Container>
        </Box>
    )
}

export default ArticlePage