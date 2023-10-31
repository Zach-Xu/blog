import { useCallback, useState } from "react"
import Modal from "../common/modal"
import TagModelContent from "./tag-modal-content"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { createTag } from "../../redux/slices/tag-slice"

interface Props {
    open: boolean
    handleClose(): void
}

const AddTagModal = ({ open, handleClose }: Props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()
        dispatch(createTag({ name, description }))
            .unwrap().then(handleClose)
    }, [name, description])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <TagModelContent
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                title='Add Tag'
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default AddTagModal