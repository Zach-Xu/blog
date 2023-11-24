import { useDispatch, useSelector } from "react-redux"
import ArticleSummaryInput from "../article-summary-input"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateEditArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const EditSummaryInput = () => {

    const summary = useSelector((state: RootState) => state.article.editArticle.summary)

    const dispatch = useDispatch<AppDispatch>()

    const handleSummaryChange = useCallback((summary: string) => {
        dispatch(updateEditArticle({ summary }))
    }, [])

    return (
        <ArticleSummaryInput
            summary={summary}
            summaryChangeHandler={handleSummaryChange}
        />
    )
}

export default EditSummaryInput