import { useCallback, useEffect, useState } from "react"
import Modal from "../common/modal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { updateCategory } from "../../redux/slices/category-slice"
import CategoryModalContent from "./category-modal-content"


interface Props {
    open: boolean
    handleClose(): void
    item: Category | undefined
}

const EditCategoryModal = ({ open, handleClose, item }: Props) => {

    const [category, setCategory] = useState<CreateCategory>({
        name: '',
        description: '',
        enable: true,
        pid: -1
    })

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()
        if (item) {
            dispatch(updateCategory({
                id: item.id,
                category: category
            })).unwrap().then(handleClose)
        }
    }, [])

    useEffect(() => {
        if (item) {
            setCategory(item)
        }
    }, [item])


    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <CategoryModalContent
                category={category}
                setCategory={setCategory}
                title='Edit Category'
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default EditCategoryModal