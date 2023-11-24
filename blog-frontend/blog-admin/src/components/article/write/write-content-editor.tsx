import { useDispatch, useSelector } from "react-redux"
import ArticleMarkdownEditor from "../article-md-editor"
import { RootState } from "../../../redux/store"
import { useCallback } from "react"
import { updateWriteArticle } from "../../../redux/slices/article-slice"

const WriteContentEditor = () => {

    const content = useSelector((state: RootState) => state.article.writeArticle.content)

    const preview = useSelector((state: RootState) => state.article.writeArticle.preview)

    const dispatch = useDispatch()

    const handleContentChange = useCallback((content: string | undefined) => {
        dispatch(updateWriteArticle({ content }))
    }, [])

    return (
        <ArticleMarkdownEditor
            content={content}
            preview={preview}
            contentChangeHandler={handleContentChange}
        />
    )
}

export default WriteContentEditor