import { useCallback } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import RoleModalContent from "./role-modal-content"
import { createRole } from "../../redux/slices/role-slice"

interface Props {
    open: boolean
    handleClose(): void
}

const AddRoleModal = ({ open, handleClose }: Props) => {


    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent, role: CreateRoleRequest) => {
        event.preventDefault()
        dispatch(createRole(role)).unwrap()
            .then(() => handleClose())
    }, [])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <RoleModalContent
                title='Create Role'
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default AddRoleModal