import { Stack, Typography, OutlinedInput, InputAdornment, Button, useMediaQuery, Theme, TextField, Radio, FormHelperText, FormControlLabel, RadioGroup, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import MenuTreeView from "./tree-select"


interface Props {
    title: string
    // category: CreateCategory
    // setCategory: React.Dispatch<CreateCategory>
    handleClose(): void
    handleSubmit: (event: React.FormEvent) => void
}

const RoleModalContent = ({ title, handleClose, handleSubmit }: Props) => {

    // const { name, description, enable, pid } = category

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    const { isLoading } = useSelector((state: RootState) => state.loading)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent) => {
        // setCategory({
        //     ...category,
        //     [e.target.name]: e.target.value
        // })
    }

    return (
        <Box
            component={'form'}
            sx={{
                flexDirection: 'column'
            }}
            onSubmit={() => { }}
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
                    Name
                </Typography>

                <OutlinedInput
                    required
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    name={'name'}
                    value={name}
                    onChange={handleChange}
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

                <TextField
                    required
                    fullWidth
                    rows={2}
                    multiline
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            </InputAdornment>
                        ),
                    }}
                    name={'description'}

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
                <Typography
                    variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1
                    }}
                >
                    Status</Typography>
                <RadioGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    name={'enable'}
                // value={enable}
                // onChange={e => {
                //     setCategory({
                //         ...category,
                //         enable: e.target.value === 'true'
                //     })
                // }}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Enable" />
                    <FormControlLabel value={false} control={<Radio />} label="Disable" />
                </RadioGroup>
            </Stack>

            <Stack
                sx={{
                    width: '100%',
                    flexDirection: lgUp ? 'row' : 'column',
                    alignItems: lgUp ? 'start' : '',
                    pt: 2,
                    pl: 2
                }}

            >
                <Typography variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1,
                    }}>
                    Permission
                </Typography>
                <Stack
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <MenuTreeView />

                </Stack>

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
        </Box>
    )
}

export default RoleModalContent