import { Stack, Typography } from '@mui/material'
import { Fragment } from 'react'

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
                        <Fragment key={path}>
                            <Typography variant='h6'>
                                /
                            </Typography>
                            <Typography variant='h6'>
                                {path}
                            </Typography>
                        </Fragment>
                    )
                }
            })}

        </Stack>
    )
}

export default Path