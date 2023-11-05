import { Stack, Typography, OutlinedInput, InputAdornment, Button, useMediaQuery, Theme, TextField } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

interface Props {
    title: string
    handleClose(): void
    handleSubmit: (event: React.FormEvent) => void
    name: string
    description: string
    setName: React.Dispatch<string>
    setDescription: React.Dispatch<string>
}

const TagModelContent = ({ title, handleClose, handleSubmit, name, description, setName, setDescription }: Props) => {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    const { isLoading } = useSelector((state: RootState) => state.loading)

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
                {title}
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
                    required
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Stack>
            <form onSubmit={handleSubmit}>
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

                    <TextField
                        required
                        fullWidth
                        rows={3}
                        multiline
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>
                            ),
                        }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
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
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="outlined"
                        sx={{
                            bgcolor: 'white',
                            '&:hover': {
                                bgcolor: 'white'
                            }
                        }}
                    >
                        Confirm
                    </LoadingButton>
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
            </form>
        </Stack>
    )
}

export default TagModelContent