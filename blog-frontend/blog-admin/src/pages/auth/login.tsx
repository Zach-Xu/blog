import React, { useCallback, useState } from 'react'
import Layout from '../../layouts/auth/layout'
import { Box, Button, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'

const Login = () => {

    const [method, setMethod] = useState('username');
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    const handleMethodChange = useCallback(
        (_: any, value: React.SetStateAction<string>) => {
            setMethod(value);
        },
        []
    );

    const handleSubmit = () => {
        alert(123)
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
                                // error={()=>{}}
                                fullWidth
                                // helperText={}
                                label={method === 'email' ? "Email Address" : 'Username'}
                                name={method === 'email' ? "email" : 'username'}
                                // onBlur={formik.handleBlur}
                                onChange={e => setAccount(e.target.value)}
                                type={method === 'email' ? 'email' : 'text'}
                                value={account}
                            />
                            <TextField
                                // error={!!(formik.touched.password && formik.errors.password)}
                                fullWidth
                                // helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                                name="password"
                                // onBlur={formik.handleBlur}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                value={password}
                            />
                        </Stack>

                        <Button
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            type="submit"
                            variant="contained"
                        >
                            Continue
                        </Button>
                    </form>
                </Box>
            </Box>
        </Layout>
    )
}

export default Login