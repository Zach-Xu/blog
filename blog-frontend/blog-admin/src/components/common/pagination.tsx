import { Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'


interface Props {
    total: number
    pageSize: number
}

const CustomPagination = ({ total, pageSize = 5 }: Props) => {

    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            sx={{
                pl: 2
            }}
        >
            <Typography>
                {`${pageSize} rows per page`}
            </Typography>
            <Pagination count={Math.ceil(total / pageSize)} page={page} onChange={handleChange} />

        </Stack>
    )
}

export default CustomPagination