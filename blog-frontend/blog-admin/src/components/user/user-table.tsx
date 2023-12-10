import { Box, Button, Stack, SvgIcon, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useCallback, useEffect, useState } from 'react';
import { updatePageNum } from '../../redux/slices/tag-slice';
import AlertDialog from '../common/alert-dialog';
import { useOpenClose } from '../../hooks/use-open-close';
import { changeUserStatus, deleteUser, getUsers } from '../../redux/slices/user-slice';
import EditUserModal from './edit-user-modal';

const UserTable = () => {

    const dispatch = useDispatch<AppDispatch>()

    const onPageChangeHandler = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
    }, [])

    const [selectedUser, setSelectedUser] = useState<UserRow>()

    const { open, handleOpen, handleClose } = useOpenClose()

    const editUserModal = useOpenClose()

    const handleDeleteUser = (user: UserRow) => {
        setSelectedUser(user)
        handleOpen()
    }

    const handleEditUser = (user: UserRow) => {
        setSelectedUser(user)
        editUserModal.handleOpen()
    }

    const handleEnableChange = async (request: ChangeStatusRequest) => {
        dispatch(changeUserStatus(request))
    }

    const confirmDelete = useCallback(() => {
        if (selectedUser) {
            dispatch(deleteUser(selectedUser.id))
            handleClose()
        }
    }, [selectedUser])

    const users = useSelector((state: RootState) => state.user.rows)
    const currentPageNum = useSelector((state: RootState) => state.user.currentPageNum)
    const totalPages = useSelector((state: RootState) => state.user.totalPages)
    const search = useSelector((state: RootState) => state.user.search)

    useEffect(() => {
        dispatch(getUsers({
            pageNum: currentPageNum,
            ...search
        }))
    }, [currentPageNum, search])


    return (
        <Box
            component='main'
        >
            <Stack
                spacing={5}
                sx={{
                    px: 2
                }}
            >
                <Scrollbar>
                    <Box sx={{
                        minWidth: 800,
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        id
                                    </TableCell>
                                    <TableCell>
                                        Username
                                    </TableCell>
                                    <TableCell>
                                        Nickname
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        Created Time
                                    </TableCell>
                                    <TableCell>
                                        Enable
                                    </TableCell>
                                    <TableCell>
                                        Operations
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                <TableBody>
                                    {users.map((user) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={user.id}
                                            >
                                                <TableCell>
                                                    {user.id}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2">
                                                        {user.username}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2">
                                                        {user.nickname}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2">
                                                        {new Date(user.createdTime).toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={user.enable}
                                                        onChange={() => handleEnableChange({
                                                            id: user.id,
                                                            enable: !user.enable
                                                        })}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Stack
                                                        spacing={2}
                                                        direction='row'
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={(
                                                                <SvgIcon fontSize="small">
                                                                    <PencilSquareIcon />
                                                                </SvgIcon>
                                                            )}
                                                            sx={{
                                                                bgcolor: 'white',
                                                                '&:hover': {
                                                                    bgcolor: 'white'
                                                                }
                                                            }}
                                                            onClick={() => handleEditUser(user)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<DeleteIcon />}
                                                            color='error'
                                                            sx={{
                                                                bgcolor: 'white',
                                                                '&:hover': {
                                                                    bgcolor: 'white'
                                                                }
                                                            }}
                                                            onClick={() => handleDeleteUser(user)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            }

                        </Table>
                        {
                            selectedUser &&
                            <AlertDialog
                                deleteMessage={`Are you sure to delete user: ${selectedUser.username} ?`}
                                open={open}
                                handleClose={handleClose}
                                confirmAction={confirmDelete}
                            />
                        }

                    </Box>
                </Scrollbar>
                <CustomPagination
                    totalPages={totalPages}
                    currentPageNum={currentPageNum + 1}
                    pageSize={5}
                    onChangeHandler={onPageChangeHandler}
                />
            </Stack>

            <EditUserModal
                open={editUserModal.open}
                handleClose={editUserModal.handleClose}
                userId={selectedUser?.id}
            />

        </Box >
    );
};

export default UserTable

