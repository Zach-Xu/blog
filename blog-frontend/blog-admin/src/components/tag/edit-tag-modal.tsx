import { useCallback, useEffect, useState } from "react"
import Modal from "../common/modal"
import TagModelContent from "./tag-modal-content"
import Loading from "../common/loading"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { updateTag } from "../../redux/slices/tag-slice"

interface Props {
    open: boolean
    handleClose(): void
    tag: Tag | undefined
}

const EditTagModal = ({ open, handleClose, tag }: Props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()
        if (tag) {
            dispatch(updateTag({
                id: tag.id,
                name,
                description
            }))
                .unwrap().then(handleClose)

        }
    }, [tag, name, description])

    useEffect(() => {
        if (tag) {
            setName(tag.name)
            setDescription(tag.description)
            setIsLoading(false)
        }
    }, [tag])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            {
                isLoading ?
                    <Loading />
                    :
                    <TagModelContent
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        title='Edit Tag'
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                    />
            }

        </Modal>
    )
}

export default EditTagModal