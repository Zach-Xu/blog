import { useDispatch, useSelector } from "react-redux"
import CategoryDropDown from "../category-dropdown"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateEditArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const EditCategoryDropDown = () => {

    const categoryId = useSelector((state: RootState) => state.article.editArticle.categoryId)

    const dispatch = useDispatch<AppDispatch>()

    const handleCategoryChange = useCallback((id: number) => {
        dispatch(updateEditArticle({ categoryId: id }))
    }, [])

    return (
        <CategoryDropDown
            categoryId={categoryId}
            categoryChangeHandler={handleCategoryChange}
        />
    )
}

export default EditCategoryDropDown
