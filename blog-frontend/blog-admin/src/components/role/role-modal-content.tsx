import { Stack, Typography, OutlinedInput, InputAdornment, Button, useMediaQuery, Theme, TextField, Radio, FormControlLabel, RadioGroup, Box } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import MenuTreeView from "./tree-select"
import { useEffect, useRef, useState } from "react"
import Loading from "../common/loading"


interface Props {
    title: string
    role?: CreateRoleRequest | EditRole
    handleClose(): void
    handleSubmit: (event: React.FormEvent, role: CreateRoleRequest) => void
}

const RoleModalContent = ({ title, role, handleClose, handleSubmit }: Props) => {

    const selectedIdsRef = useRef<number[]>([])

    const [localName, setLocalName] = useState<string>('')
    const [localDescription, setLocalDescription] = useState<string>('')
    const [localEnable, setLocalEnable] = useState<boolean>(true)

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    useEffect(() => {
        if (role) {
            setLocalName(role.roleName)
            setLocalDescription(role.description)
            setLocalEnable(role.enable)
        }
    }, [role])

    const isLoading = useSelector((state: RootState) => state.loading.isLoading)

    return (
        <Box
            component={'form'}
            sx={{
                flexDirection: 'column'
            }}
            onSubmit={e => handleSubmit(e,
                {
                    roleName: localName,
                    description: localDescription,
                    enable: localEnable,
                    menuIds: selectedIdsRef.current
                }
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
                    value={localName}
                    onChange={e => setLocalName(e.target.value)}
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
                    value={localDescription}
                    onChange={e => setLocalDescription(e.target.value)}
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
                    value={localEnable}
                    onChange={e => {
                        setLocalEnable(e.target.value === 'true')
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
                    <MenuTreeView menuIds={role ? role.menuIds : []} ref={selectedIdsRef} />

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