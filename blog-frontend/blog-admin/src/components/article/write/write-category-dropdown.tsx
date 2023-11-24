import { useDispatch, useSelector } from "react-redux"
import CategoryDropDown from "../category-dropdown"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateWriteArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const WriteCategoryDropDown = () => {

    const categoryId = useSelector((state: RootState) => state.article.writeArticle.categoryId)

    const dispatch = useDispatch<AppDispatch>()
    const handleCategoryChange = useCallback((id: number) => {
        dispatch(updateWriteArticle({ categoryId: id }))
    }, [])

    return (
        <CategoryDropDown
            categoryId={categoryId}
            categoryChangeHandler={handleCategoryChange}
        />
    )
}

export default WriteCategoryDropDown
