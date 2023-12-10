import { useCallback, useEffect, useState } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import UserModalContent from "./user-modal-content"
import { updateUser } from "../../redux/slices/user-slice"
import { userService } from "../../services/resources/user-service"

interface Props {
    open: boolean
    handleClose(): void
    userId: number | undefined
}

const EditUserModal = ({ open, handleClose, userId }: Props) => {

    const dispatch = useDispatch<AppDispatch>()

    const [user, setUser] = useState<UserDetails>()

    const handleSubmit = useCallback((event: React.FormEvent, user: CreateUserRequest) => {
        if (!userId) return

        const editUser: UpdateUserRequest = {
            ...user,
            id: userId
        }
        event.preventDefault()
        dispatch(updateUser(editUser)).unwrap()
            .then(() => handleClose())
    }, [userId])

    useEffect(() => {
        const fetchUserDetails = async (userId: number) => {
            const result = await userService.getUserDetails(userId)
            setUser(result)
        }
        if (userId) {
            fetchUserDetails(userId)
        }
    }, [userId])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <UserModalContent
                title='Edit User'
                user={user}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default EditUserModal