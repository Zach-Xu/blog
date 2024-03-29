import { PlusIcon } from '@heroicons/react/20/solid';
import { useMediaQuery, Box, Container, Stack, Button, SvgIcon, Theme } from '@mui/material';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTagModal from '../../../components/tag/add-tag-modal';
import { TagsTable } from '../../../components/tag/tag-table';
import { useOpenClose } from '../../../hooks/use-open-close';
import { updateSearchName } from '../../../redux/slices/tag-slice';
import { RootState, AppDispatch } from '../../../redux/store';
import Search from '../../../components/common/search';


const TagPage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const name = useSelector((state: RootState) => state.tag.name)

    const dispatch = useDispatch<AppDispatch>()

    const onKeyUpHandler = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchName = event.target.value.trim()
            dispatch(updateSearchName(searchName))
        }
    }, [])

    const clickHandler = useCallback((searchName: string) => {
        dispatch(updateSearchName(searchName))
    }, [])

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
                                    onClick={handleOpen}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Stack>
                        <TagsTable />
                    </Stack>
                </Container>
            </Box>
            <AddTagModal
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}

export default TagPage