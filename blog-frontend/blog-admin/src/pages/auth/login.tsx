import React, { FormEvent, useCallback, useState } from 'react'
import Layout from '../../layouts/auth/layout'
import { Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/slices/auth-slice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [method, setMethod] = useState('username');
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    const { isLoading } = useSelector((state: RootState) => state.loading)

    const handleMethodChange = useCallback(
        (_: any, value: React.SetStateAction<string>) => {
            setMethod(value);
        },
        []
    );

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        dispatch(login({
            username: account,
            password
        }))
            .unwrap().then(() => navigate('/tag'))
    }

    return (
        <Layout>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <Stack
                        spacing={1}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant='h4'>
                            Login
                        </Typography>
                        <Typography variant='body2'>
                            Don&apos;t have an account?
                            &nbsp;
                            Register
                        </Typography>
                    </Stack>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Tabs
                            onChange={handleMethodChange}
                            sx={{ mb: 3 }}
                            value={method}
                        >
                            <Tab
                                label="Username"
                                value="username"
                            />
                            <Tab
                                label="Email"
                                value="email"
                            />
                        </Tabs>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label={method === 'email' ? "Email Address" : 'Username'}
                                name={method === 'email' ? "email" : 'username'}
                                onChange={e => setAccount(e.target.value)}
                                type={method === 'email' ? 'email' : 'text'}
                                value={account}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                value={password}
                            />
                        </Stack>

                        <LoadingButton
                            loading={isLoading}
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            type="submit"
                            variant="contained"
                        >
                            Continue
                        </LoadingButton>
                    </form>
                </Box>
            </Box>
        </Layout>
    )
}

export default Login