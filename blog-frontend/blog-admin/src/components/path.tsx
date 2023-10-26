import { Stack, Typography } from '@mui/material'

interface Props {
    path: string[] | null
}

const Path = ({ path }: Props) => {

    if (!path) {
        return (
            <Typography variant='h6'>
                Dashboard
            </Typography>
        )
    }

    return (
        <Stack
            alignItems="center"
            direction="row"
            spacing={2}
        >
            {path.map((path, idx) => {
                if (idx === 0) {
                    return (
                        <Typography variant='h6' key={'dashboard'}>
                            Dashboard
                        </Typography>
                    )
                }
                else {
                    return (
                        <>
                            <Typography variant='h6' key={'/'}>
                                /
                            </Typography>
                            <Typography variant='h6' key={path}>
                                {path}
                            </Typography>
                        </>
                    )
                }
            })}

        </Stack>
    )
}

export default Path