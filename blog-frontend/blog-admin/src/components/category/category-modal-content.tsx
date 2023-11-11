import { Stack, Typography, OutlinedInput, InputAdornment, Button, useMediaQuery, Theme, TextField, Radio, FormHelperText, FormControlLabel, RadioGroup, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { MenuProps } from "../../utils/drop-down-utils"

interface Props {
    title: string
    category: CreateCategory
    setCategory: React.Dispatch<CreateCategory>
    handleClose(): void
    handleSubmit: (event: React.FormEvent) => void
}

const CategoryModalContent = ({ title, category, setCategory, handleClose, handleSubmit }: Props) => {

    const { name, description, enable, pid } = category

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    const { isLoading } = useSelector((state: RootState) => state.loading)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const categories = useSelector((state: RootState) => state.category.parents)

    return (
        <Box
            component={'form'}
            sx={{
                flexDirection: 'column'
            }}
            onSubmit={handleSubmit}
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
                    rows={3}
                    multiline
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            </InputAdornment>
                        ),
                    }}
                    name={'description'}
                    value={description}
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
                    value={enable}
                    onChange={e => {
                        setCategory({
                            ...category,
                            enable: e.target.value === 'true'
                        })
                    }}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Enable" />
                    <FormControlLabel value={false} control={<Radio />} label="Disable" />
                </RadioGroup>
            </Stack>

            <Stack
                sx={{
                    width: '100%',
                    flexDirection: lgUp ? 'row' : 'column',
                    alignItems: lgUp ? 'end' : '',
                    pt: 2,
                    pl: 2
                }}

            >
                <Typography variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1,
                        transform: 'translateY(-50%)'
                    }}>
                    Parent
                </Typography>
                <Stack
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <FormHelperText>{'Parent category, select the first option if you want the category itself to be a parent'}</FormHelperText>
                    <Select
                        required
                        fullWidth
                        MenuProps={MenuProps}
                        name={'parentId'}
                        value={pid}
                        onChange={e => {
                            setCategory({
                                ...category,
                                pid: e.target.value as number
                            })
                        }}
                    >
                        <MenuItem
                            value={-1}
                        >
                            Self
                        </MenuItem>
                        {
                            categories &&
                            categories.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </MenuItem>
                            ))
                        }
                    </Select>

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

export default CategoryModalContent