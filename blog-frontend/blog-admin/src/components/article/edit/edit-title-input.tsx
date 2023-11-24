import { useDispatch, useSelector } from "react-redux"
import ArticleTitleInput from "../article-title-input"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateEditArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"


const EditTitleInput = () => {
    const title = useSelector((state: RootState) => state.article.editArticle.title)
    const dispatch = useDispatch<AppDispatch>()

    const handleTitleChange = useCallback((title: string) => {
        dispatch(updateEditArticle({ title }))
    }, [])

    return (
        <ArticleTitleInput
            title={title}
            titleChangeHandler={handleTitleChange}
        />
    )
}

export default EditTitleInput