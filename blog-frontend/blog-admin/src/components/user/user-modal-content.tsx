import { Stack, Typography, OutlinedInput, InputAdornment, Button, useMediaQuery, Theme, Radio, FormControlLabel, RadioGroup, Box, Select, Chip, MenuItem, useTheme, SelectChangeEvent, FormHelperText } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { ChangeEvent, useEffect, useState } from "react"
import { MenuProps, getStyles } from "../../utils/drop-down-utils"


const getLabelName = (id: number, roles?: RoleNameResponse[]): string => {
    if (!roles) {
        return ''
    }

    return roles.find(role => role.id === id)?.roleName || ''
}


interface Props {
    title: 'Create User' | 'Edit User'
    user?: UserDetails
    handleClose(): void
    handleSubmit: (event: React.FormEvent, user: CreateUserRequest) => void
}

const genders = ['MALE', 'FEMALE', 'UNKNOWN']

const UserModalContent = ({ title, user, handleClose, handleSubmit }: Props) => {

    const theme = useTheme()

    const [localUser, setLocalUser] = useState<CreateUserRequest>({
        username: '',
        email: '',
        nickname: '',
        phoneNumber: '',
        enable: true,
        roleIds: [],
        gender: '',
        password: '',
    })

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    useEffect(() => {
        if (user) {
            setLocalUser({
                ...user,
                password: ''
            })
        }
    }, [user])

    const isLoading = useSelector((state: RootState) => state.loading.isLoading)

    const roles = useSelector((state: RootState) => state.user.roles)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalUser({
            ...localUser,
            [e.target.name]: e.target.value
        })
    }

    const handleChange = (e: SelectChangeEvent<number[]>) => {
        setLocalUser({
            ...localUser,
            roleIds: e.target.value as number[]
        })
    }

    const resetUser = () => {
        switch (title) {
            case "Create User":
                setLocalUser({
                    username: '',
                    nickname: '',
                    email: '',
                    phoneNumber: '',
                    enable: true,
                    roleIds: [],
                    gender: '',
                    password: '',
                })
                break
            case "Edit User":
                if (user) {
                    setLocalUser({
                        ...user,
                        password: ''
                    })
                }
                break
        }
    }

    return (
        <Box
            component={'form'}
            sx={{
                flexDirection: 'column',
                display: 'flex',
                gap: 1
            }}
            onSubmit={e => handleSubmit(e,
                localUser
            )}
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
                    Username
                </Typography>

                <OutlinedInput
                    readOnly={title === 'Edit User'}
                    required
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    name={'username'}
                    value={localUser.username}
                    onChange={handleInputChange}
                />
            </Stack>
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
                    Nickname
                </Typography>

                <OutlinedInput
                    required
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    name={'nickname'}
                    value={localUser.nickname}
                    onChange={handleInputChange}
                />
            </Stack>

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
                    Phone
                </Typography>

                <OutlinedInput
                    required
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    name={'phoneNumber'}
                    value={localUser.phoneNumber}
                    onChange={handleInputChange}
                />
            </Stack>
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
                    Email
                </Typography>

                <OutlinedInput
                    required
                    fullWidth
                    placeholder={''}
                    startAdornment={(
                        <InputAdornment position="start">
                        </InputAdornment>
                    )}
                    name={'email'}
                    value={localUser.email}
                    onChange={handleInputChange}
                />
            </Stack>

            <Stack
                sx={{
                    width: '100%',
                    flexDirection: lgUp ? 'row' : 'column',
                    alignItems: lgUp ? 'end' : '',
                    pl: 2
                }}
            >
                <Typography variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1,
                        transform: lgUp ? 'translateY(-50%)' : ''
                    }}>
                    Password
                </Typography>
                <Stack
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <FormHelperText>
                        {'Required only if you want to change the password'}
                    </FormHelperText>
                    <OutlinedInput
                        type="Password"
                        fullWidth
                        placeholder={''}
                        startAdornment={(
                            <InputAdornment position="start">
                            </InputAdornment>
                        )}
                        name={'password'}
                        value={localUser.password}
                        onChange={handleInputChange}
                    />
                </Stack>
            </Stack>

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
                        mb: lgUp ? '' : 1,
                    }}>
                    Gender
                </Typography>
                <Select
                    fullWidth
                    MenuProps={MenuProps}
                    value={localUser.gender}
                    onChange={e => setLocalUser({
                        ...localUser,
                        gender: e.target.value as typeof localUser.gender
                    })}

                >
                    {
                        genders.map((gender, idx) => (
                            <MenuItem
                                key={idx}
                                value={gender}
                            >
                                {gender}
                            </MenuItem>
                        ))
                    }
                </Select>
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
                    Status
                </Typography>
                <RadioGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    name={'enable'}
                    value={localUser.enable}
                    onChange={e => {
                        setLocalUser({
                            ...localUser,
                            enable: (e.target.value === 'true')
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
                    alignItems: lgUp ? 'center' : '',
                    pt: 2,
                    pl: 2
                }}

            >
                <Typography variant="subtitle2"
                    sx={{
                        width: 100,
                        mb: lgUp ? '' : 1,
                    }}>
                    Role
                </Typography>
                <Stack
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Select
                        sx={{
                            flex: '1 1 auto'
                        }}
                        multiple
                        value={localUser.roleIds}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={getLabelName(value, roles)} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {
                            roles && roles.map((role) => (
                                <MenuItem
                                    key={role.id}
                                    value={role.id}
                                    style={getStyles(role.id, localUser.roleIds, theme)}
                                >
                                    {role.roleName}
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
                <Button
                    variant="outlined"
                    color='success'
                    sx={{
                        bgcolor: 'white',
                        '&:hover': {
                            bgcolor: 'white'
                        }
                    }}
                    onClick={resetUser}
                >
                    Reset
                </Button>
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

export default UserModalContent