import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { OutlinedInput, InputAdornment, SvgIcon, Stack, Typography, Button, useMediaQuery, Theme } from '@mui/material'

interface Props {
    name: string
    placeholder: string
}

const Search = ({ name, placeholder }: Props) => {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            sx={{
                pl: 3
            }}
        >
            {
                lgUp && (
                    <Typography variant='subtitle1'>
                        {name}
                    </Typography>
                )
            }
            <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder={lgUp ? '' : placeholder}
                startAdornment={(
                    <InputAdornment position="start">
                    </InputAdornment>
                )}
                sx={lgUp ? { maxWidth: 250 } : { maxWidth: 500 }}
            />

            <Button
                startIcon={(
                    <SvgIcon fontSize="small">
                        <MagnifyingGlassIcon />
                    </SvgIcon>
                )}
                variant="contained"
            >
                Search
            </Button>
        </Stack>
    )
}

export default Search