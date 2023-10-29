import { Stack, Typography, OutlinedInput, InputAdornment, Button, useMediaQuery, Theme, Box, TextareaAutosize } from "@mui/material"
import Textarea from "../common/textarea"

interface Props {
    handleClose(): void
}


const TagModelContent = ({ handleClose }: Props) => {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    return (
        <Stack
            sx={{
                flexDirection: 'column'
            }}
        >
            <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
            >
                Add Tag
            </Typography>
            <Stack
                sx={{
                    width: '100%',
                    flexDirection: lgUp ? 'row' : 'column',
                    alignItems: lgUp ? 'center' : '',
                    pl: 2
                }}
            >
                <Typography variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1
                    }}>
                    Tag Name
                </Typography>

                <OutlinedInput
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                />
            </Stack>
            <Stack
                sx={{
                    width: '100%',
                    flexDirection: lgUp ? 'row' : 'column',
                    alignItems: lgUp ? 'center' : '',
                    pt: 2,
                    pl: 2
                }}

            >
                <Typography variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1
                    }}>
                    Description
                </Typography>
                <Textarea
                // startAdornment={(
                //     <InputAdornment position="start">
                //     </InputAdornment>
                // )}
                />
            </Stack>
            <Stack
                direction='row'
                spacing={2}
                sx={{
                    marginTop: 4,
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        bgcolor: 'white',
                        '&:hover': {
                            bgcolor: 'white'
                        }
                    }}
                >
                    Confirm
                </Button>
                <Button
                    variant="outlined"
                    color='error'
                    sx={{
                        bgcolor: 'white',
                        '&:hover': {
                            bgcolor: 'white'
                        }
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </Stack>
        </Stack>
    )
}

export default TagModelContent