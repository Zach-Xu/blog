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
import { changeRoleStatus, deleteRole, getRoles } from '../../redux/slices/role-slice';
import EditRoleModal from './edit-role-modal';

const RoleTable = () => {

    const dispatch = useDispatch<AppDispatch>()

    const onPageChangeHandler = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updatePageNum(value - 1))
    }, [])

    const [selectedRole, setSelectedRole] = useState<Role>()

    const { open, handleOpen, handleClose } = useOpenClose()

    const editRoleModal = useOpenClose()

    const deleteRoleHandler = (role: Role) => {
        setSelectedRole(role)
        handleOpen()
    }

    const editRoleHandler = (role: Role) => {
        setSelectedRole(role)
        editRoleModal.handleOpen()
    }

    const handleEnableChange = async (request: ChangeStatusRequest) => {
        dispatch(changeRoleStatus(request))
    }

    const confirmDelete = useCallback(() => {
        if (selectedRole) {
            dispatch(deleteRole(selectedRole.id))
            handleClose()
        }
    }, [selectedRole])

    const roles = useSelector((state: RootState) => state.role.rows)
    const currentPageNum = useSelector((state: RootState) => state.role.currentPageNum)
    const totalPages = useSelector((state: RootState) => state.role.totalPages)
    const search = useSelector((state: RootState) => state.role.search)

    useEffect(() => {
        dispatch(getRoles({
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
                                        Role name
                                    </TableCell>
                                    <TableCell>
                                        Description
                                    </TableCell>
                                    <TableCell>
                                        Created Time
                                    </TableCell>
                                    <TableCell>
                                        enable
                                    </TableCell>
                                    <TableCell>
                                        Operations
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                <TableBody>
                                    {roles.map((role) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={role.id}
                                            >
                                                <TableCell>
                                                    {role.roleName}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography >
                                                        {role.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2">
                                                        {new Date(role.createdTime).toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={role.enable}
                                                        onChange={() => handleEnableChange({
                                                            id: role.id,
                                                            enable: !role.enable
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
                                                            onClick={() => editRoleHandler(role)}
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
                                                            onClick={() => deleteRoleHandler(role)}
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
                            selectedRole &&
                            <AlertDialog
                                deleteMessage={`Are you sure to delete role: ${selectedRole.roleName} ?`}
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

            <EditRoleModal
                open={editRoleModal.open}
                handleClose={editRoleModal.handleClose}
                roleId={selectedRole?.id}
            />

        </Box >
    );
};

export default RoleTable

