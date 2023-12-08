import { useCallback, useEffect, useState } from "react"
import Modal from "../common/modal"
import { useDispatch, } from "react-redux"
import { AppDispatch, } from "../../redux/store"
import RoleModalContent from "./role-modal-content"
import { roleService } from "../../services/resources/role-service"
import { updateRole } from "../../redux/slices/role-slice"


interface Props {
    open: boolean
    handleClose(): void
    roleId: number | undefined
}

const EditRoleModal = ({ open, handleClose, roleId }: Props) => {

    const dispatch = useDispatch<AppDispatch>()

    const [role, setRole] = useState<EditRole>()



    useEffect(() => {
        const fetchRoleDetails = async (roleId: number) => {
            const result = await roleService.getRoleDetails(roleId)
            setRole(result)
        }
        if (roleId) {
            fetchRoleDetails(roleId)
        }

    }, [roleId])

    const handleSubmit = useCallback((event: React.FormEvent, role: CreateRoleRequest) => {
        event.preventDefault()
        if (!roleId) {
            return
        }
        dispatch(updateRole({
            id: roleId,
            ...role
        })).unwrap()
            .then(() => handleClose())
    }, [roleId])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <RoleModalContent
                title='Edit Role'
                role={role}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default EditRoleModal