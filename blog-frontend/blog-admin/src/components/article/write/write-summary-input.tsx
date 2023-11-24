import { useDispatch, useSelector } from "react-redux"
import ArticleSummaryInput from "../article-summary-input"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateWriteArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const WriteSummaryInput = () => {

    const summary = useSelector((state: RootState) => state.article.writeArticle.summary)

    const dispatch = useDispatch<AppDispatch>()

    const handleSummaryChange = useCallback((summary: string) => {
        dispatch(updateWriteArticle({ summary }))
    }, [])

    return (
        <ArticleSummaryInput
            summary={summary}
            summaryChangeHandler={handleSummaryChange}
        />
    )
}

export default WriteSummaryInput