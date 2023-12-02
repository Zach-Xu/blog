import { useCallback, useState } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { createTag } from "../../redux/slices/tag-slice"
import RoleModalContent from "./role-modal-content"
import Box from "@mui/material/Box"

interface Props {
    open: boolean
    handleClose(): void
}

const AddRoleModal = ({ open, handleClose }: Props) => {

    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()

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