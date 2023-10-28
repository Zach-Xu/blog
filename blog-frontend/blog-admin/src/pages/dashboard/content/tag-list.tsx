import Box from '@mui/material/Box'
import DashboardLayout from '../../../layouts/dashboard/layout'
import { Container, Stack } from '@mui/material'
import Search from '../../../components/common/search'
import { TagsTable } from '../../../components/tag/tag-table'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { getTags, updateSearchName } from '../../../redux/slices/tag-slice'
import Loading from '../../../components/common/loading'


const TagList = () => {

    const { rows: tags, currentPageNum, name } = useSelector((state: RootState) => state.tag)

    const { isLoading } = useSelector((state: RootState) => state.loading)

    const dispatch = useDispatch<AppDispatch>()

    const onKeyUpHandler = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchName = event.target.value.trim()
            dispatch(updateSearchName(searchName))
            dispatch(getTags({
                name: searchName
            }))
        }
    }, [])

    const clickHandler = useCallback((searchName: string) => {
        dispatch(getTags({
            name: searchName
        }))
    }, [])

    useEffect(() => {
        dispatch(getTags({
            pageNum: currentPageNum
        }))

    }, [currentPageNum])

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
                    <Stack spacing={3}>
                        <Search
                            searchName={name}
                            onKeyUpHandler={onKeyUpHandler}
                            clickHandler={clickHandler}
                            name='Tag name'
                            placeholder='please input tag name'
                        />
                        {
                            isLoading ?
                                <Loading />
                                :
                                <TagsTable tags={tags} />

                        }
                    </Stack>
                </Container>
            </Box>
        </DashboardLayout>
    )
}

export default TagList