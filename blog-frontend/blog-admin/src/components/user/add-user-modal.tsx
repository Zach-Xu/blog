import { useCallback } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import UserModalContent from "./user-modal-content"
import { createUser } from "../../redux/slices/user-slice"

interface Props {
    open: boolean
    handleClose(): void
}

const AddUserModal = ({ open, handleClose }: Props) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent, user: CreateUserRequest) => {
        event.preventDefault()
        dispatch(createUser(user)).unwrap()
            .then(() => handleClose())
    }, [])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <UserModalContent
                title='Create User'
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default AddUserModal