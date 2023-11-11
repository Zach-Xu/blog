import { useCallback, useState } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import CategoryModalContent from "./category-modal-content"
import { createCategory } from "../../redux/slices/category-slice"

interface Props {
    open: boolean
    handleClose(): void
}

const AddCategoryModal = ({ open, handleClose }: Props) => {

    const [category, setCategory] = useState<CreateCategory>({
        name: '',
        description: '',
        enable: true,
        pid: -1
    })

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()
        dispatch(createCategory(category))
            .unwrap().then(handleClose)
    }, [category])

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <CategoryModalContent
                category={category}
                setCategory={setCategory}
                title='Add Category'
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default AddCategoryModal