import { useDispatch, useSelector } from "react-redux"

import Search from "../common/search"
import { AppDispatch, RootState } from "../../redux/store"
import { useCallback } from "react"
import { getArticles, updateSearch } from "../../redux/slices/article-slice"
import { Box, InputAdornment, OutlinedInput, Theme, Typography, useMediaQuery } from "@mui/material"


interface Props {
    radioChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchArticle = ({ }: Props) => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const title = useSelector((state: RootState) => state.article.search.title)
    const summary = useSelector((state: RootState) => state.article.search.summary)

    const dispatch = useDispatch<AppDispatch>()

    const handleTitleKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchTitle = event.target.value.trim()
            dispatch(updateSearch({ title: searchTitle }))
            dispatch(getArticles({
                title: searchTitle,
                summary
            }))
        }
    }, [summary])

    const handleSummaryKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchSummary = event.target.value.trim()
            dispatch(updateSearch({ summary: searchSummary }))
            dispatch(getArticles({
                title,
                summary: searchSummary
            }))
        }
    }, [title])

    const handleClick = useCallback((searchName: string) => {
        dispatch(getArticles({
            title: searchName,
            summary
        }))
    }, [summary])


    return (
        <Search
            searchName={title}
            onKeyUpHandler={handleTitleKeyUp}
            clickHandler={handleClick}
            name='Title'
            placeholder='Title'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    ml: 2
                }}
            >
                {
                    mdUp && (
                        <Typography variant='subtitle1' sx={{ mr: 2 }}>
                            Summary
                        </Typography>
                    )
                }
                <OutlinedInput
                    fullWidth
                    placeholder={mdUp ? '' : 'Summary'}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    value={summary}
                    onChange={(e) => dispatch(updateSearch({ summary: e.target.value }))}
                    sx={mdUp ? { maxWidth: 350 } : { maxWidth: 500 }}
                    onKeyUp={handleSummaryKeyUp}
                />
            </Box>
        </Search>
    )
}

export default SearchArticle