import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { OutlinedInput, InputAdornment, SvgIcon, Stack, Typography, Button, useMediaQuery, Theme, Box } from '@mui/material'
import { useState } from 'react'

interface Props {
    name: string
    placeholder: string
    onKeyUpHandler: (event: React.KeyboardEvent) => void
    clickHandler: (searchName: string) => void
    children?: React.ReactNode
    searchName: string
    sm_screen_maxWdith?: number
    lg_screen_maxWdith?: number
}

const Search = ({ name, placeholder, onKeyUpHandler, clickHandler, searchName, children, lg_screen_maxWdith = 350, sm_screen_maxWdith = 500 }: Props) => {

    const [value, setValue] = useState(searchName)

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent={mdUp ? '' : 'space-between'}
            width={'100%'}
            display={'flex'}
        >
            {
                mdUp && (
                    <Typography variant='subtitle1' sx={{ mr: 2 }}>
                        {name}
                    </Typography>
                )
            }
            <OutlinedInput
                fullWidth
                placeholder={mdUp ? '' : placeholder}
                startAdornment={(
                    <InputAdornment position="start">
                    </InputAdornment>
                )}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={mdUp ? { maxWidth: lg_screen_maxWdith } : { maxWidth: sm_screen_maxWdith }}
                onKeyUp={onKeyUpHandler}
            />
            {
                children
            }
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
            }}>
                <Button
                    sx={{
                        ml: 2
                    }}
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                    )}
                    variant="contained"
                    onClick={() => clickHandler(value)}
                >
                    Search
                </Button>
            </Box>
        </Stack>
    )
}

export default Search