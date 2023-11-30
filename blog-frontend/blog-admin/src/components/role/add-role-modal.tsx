import { useCallback, useState } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { createTag } from "../../redux/slices/tag-slice"
import RoleModalContent from "./role-modal-content"

interface Props {
    open: boolean
    handleClose(): void
}

const AddRoleModal = ({ open, handleClose }: Props) => {

    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    // const handleSubmit = useCallback((event: React.FormEvent) => {
    //     event.preventDefault()
    //     dispatch(createTag({ name, description }))
    //         .unwrap().then(handleClose)
    // }, [name, description])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            {/* <RoleModalContent
                category={category}
                setCategory={setCategory}
                title='Add Category'
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            /> */}
            <RoleModalContent
                title='Create Role'
            />
        </Modal>
    )
}

export default AddRoleModal