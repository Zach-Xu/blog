import { Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'


const Path = () => {

    const location = useLocation()

    const path = useMemo(() => {
        const parts = location.pathname.split('/')
            .filter(part => part !== '')
            .flatMap(part => ["/", part.charAt(0).toUpperCase() + part.slice(1)])
        parts.unshift('Dashboard')
        return parts
    }, [location.pathname])

    return (
        <Stack
            alignItems="center"
            direction="row"
            spacing={2}
        >
            {
                path.map((part, idx) => (
                    <Typography variant='h6' key={part + idx}>
                        {part}
                    </Typography>
                ))
            }


        </Stack>
    )
}

export default Path