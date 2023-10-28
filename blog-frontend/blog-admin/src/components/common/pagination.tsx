import { Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


interface Props {
    pageSize: number
    totalPages: number
    currentPageNum: number
    onChangeHandler: (event: React.ChangeEvent<unknown>, value: number) => void
}

const CustomPagination = ({ totalPages, pageSize = 5, currentPageNum, onChangeHandler }: Props) => {


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
            <Pagination count={totalPages} page={currentPageNum} onChange={onChangeHandler} />

        </Stack>
    )
}

export default CustomPagination