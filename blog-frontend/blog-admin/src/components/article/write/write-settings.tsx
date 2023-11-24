import { useDispatch, useSelector } from "react-redux"
import ArticleSettings from "../article-settings"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateWriteArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const WriteSettings = () => {

    const allowedComment = useSelector((state: RootState) => state.article.writeArticle.allowedComment)
    const pinned = useSelector((state: RootState) => state.article.writeArticle.pinned)

    const dispatch = useDispatch<AppDispatch>()

    const handleAllowedCommentChange = useCallback((allowedComment: boolean) => {
        dispatch(updateWriteArticle({ allowedComment }))
    }, [])

    const handlePinnedChange = useCallback((pinned: boolean) => {
        dispatch(updateWriteArticle({ pinned }))
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

export default WriteSettings