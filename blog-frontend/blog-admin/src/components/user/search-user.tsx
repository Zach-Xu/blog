import { useDispatch, useSelector } from "react-redux"

import Search from "../common/search"
import { AppDispatch, RootState } from "../../redux/store"
import { useCallback, useState } from "react"
import { Box, InputAdornment, OutlinedInput, Theme, Typography, useMediaQuery } from "@mui/material"
import { updateSearch } from "../../redux/slices/user-slice"


interface Props {
    radioChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchUser = ({ }: Props) => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const username = useSelector((state: RootState) => state.user.search.username)
    const email = useSelector((state: RootState) => state.article.search.summary)

    const [localEmail, setLocaEmail] = useState(email)

    const dispatch = useDispatch<AppDispatch>()

    const handleUsernameKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchUsername = event.target.value.trim()
            dispatch(updateSearch({ username: searchUsername }))
        }
    }, [])

    const handleEmailKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchEmail = event.target.value.trim()
            dispatch(updateSearch({ email: searchEmail }))
        }
    }, [])

    const handleClick = useCallback((searchUsername: string) => {
        dispatch(updateSearch({
            username: searchUsername,
            email: localEmail
        }))
    }, [localEmail])


    return (
        <Search
            searchName={username}
            onKeyUpHandler={handleUsernameKeyUp}
            clickHandler={handleClick}
            name='Username'
            placeholder='Username'
            lg_screen_maxWdith={250}
            sm_screen_maxWdith={150}
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
                            Email
                        </Typography>
                    )
                }
                <OutlinedInput
                    fullWidth
                    placeholder={mdUp ? '' : 'Email'}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    value={localEmail}
                    onChange={(e) => setLocaEmail(e.target.value)}
                    sx={mdUp ? { maxWidth: 350 } : { maxWidth: 500 }}
                    onKeyUp={handleEmailKeyUp}
                />
            </Box>
        </Search>
    )
}

export default SearchUser