import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { OutlinedInput, InputAdornment, SvgIcon, Stack, Typography, Button, useMediaQuery, Theme } from '@mui/material'
import { useState } from 'react'

interface Props {
    name: string
    placeholder: string
    onKeyUpHandler: (event: React.KeyboardEvent) => void
    clickHandler: (searchName: string) => void
    searchName: string
}

const Search = ({ name, placeholder, onKeyUpHandler, clickHandler, searchName }: Props) => {

    const [value, setValue] = useState(searchName)

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent={mdUp ? '' : 'space-between'}
            spacing={2}
            width={'100%'}
        >
            {
                mdUp && (
                    <Typography variant='subtitle1'>
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
                sx={mdUp ? { maxWidth: 350 } : { maxWidth: 500 }}
                onKeyUp={onKeyUpHandler}
            />

            <Button
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
        </Stack>
    )
}

export default Search