import { useDispatch, useSelector } from "react-redux"
import ArticleMarkdownEditor from "../article-md-editor"
import { RootState } from "../../../redux/store"
import { useCallback } from "react"
import { updateEditArticle } from "../../../redux/slices/article-slice"

const EditContentEditor = () => {

    const content = useSelector((state: RootState) => state.article.editArticle.content)

    const preview = useSelector((state: RootState) => state.article.editArticle.preview)

    const dispatch = useDispatch()

    const handleContentChange = useCallback((content: string | undefined) => {
        dispatch(updateEditArticle({ content }))
    }, [])

    return (
        <ArticleMarkdownEditor
            content={content}
            preview={preview}
            contentChangeHandler={handleContentChange}
        />
    )
}

export default EditContentEditor