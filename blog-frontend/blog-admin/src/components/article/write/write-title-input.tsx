import { useDispatch, useSelector } from "react-redux"
import ArticleTitleInput from "../article-title-input"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateWriteArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"


const WriteTitleInput = () => {
    const title = useSelector((state: RootState) => state.article.writeArticle.title)
    const dispatch = useDispatch<AppDispatch>()

    const handleTitleChange = useCallback((title: string) => {
        dispatch(updateWriteArticle({ title }))
    }, [])

    return (
        <ArticleTitleInput
            title={title}
            titleChangeHandler={handleTitleChange}
        />
    )
}

export default WriteTitleInput