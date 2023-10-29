import Box from '@mui/material/Box'
import { Button, Container, Stack, SvgIcon, Theme, useMediaQuery } from '@mui/material'
import Search from '../../../components/common/search'
import { TagsTable } from '../../../components/tag/tag-table'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { getTags, updateSearchName } from '../../../redux/slices/tag-slice'
import Loading from '../../../components/common/loading'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from '../../../components/common/modal'
import { useModal } from '../../../hooks/use-modal'
import TagModelContent from '../../../components/tag/tag-modal-content'


const TagList = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

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

    const tagModal = useModal()

    useEffect(() => {
        dispatch(getTags({
            pageNum: currentPageNum
        }))
    }, [currentPageNum])

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
                            <Search
                                searchName={name}
                                onKeyUpHandler={onKeyUpHandler}
                                clickHandler={clickHandler}
                                name='Tag name'
                                placeholder='please input tag name'
                            />
                            <Box
                            >
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={tagModal.handleOpen}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Stack>
                        {
                            isLoading ?
                                <Loading />
                                :
                                <TagsTable tags={tags} />

                        }
                    </Stack>
                </Container>
            </Box>
            <Modal
                open={tagModal.open}
                handleClose={tagModal.handleClose}
            >
                <TagModelContent
                    handleClose={tagModal.handleClose}
                />
            </Modal>
        </>
    )
}

export default TagList