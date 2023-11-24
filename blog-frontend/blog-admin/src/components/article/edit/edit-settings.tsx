import { useDispatch, useSelector } from "react-redux"
import ArticleSettings from "../article-settings"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateEditArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const EditSettings = () => {

    const allowedComment = useSelector((state: RootState) => state.article.editArticle.allowedComment)
    const pinned = useSelector((state: RootState) => state.article.editArticle.pinned)

    const dispatch = useDispatch<AppDispatch>()

    const handleAllowedCommentChange = useCallback((allowedComment: boolean) => {
        dispatch(updateEditArticle({ allowedComment }))
    }, [])

    const handlePinnedChange = useCallback((pinned: boolean) => {
        dispatch(updateEditArticle({ pinned }))
    }, [])

    return (
        <ArticleSettings
            allowedComment={allowedComment}
            pinned={pinned}
            allowedCommentChangeHandler={handleAllowedCommentChange}
            pinnedChangeHandler={handlePinnedChange}
        />
    )
}

export default EditSettings