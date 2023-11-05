import { FormLabel, InputAdornment, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateWriteArticle } from "../../redux/slices/article-slice"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

const ArticleSummaryInput = () => {

    const summary = useSelector((state: RootState) => state.article.writeArticle.summary)

    const dispatch = useDispatch()

    const summaryError = useSelector((state: RootState) => state.errorMessage.article.summary)

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() !== '' && summaryError !== '') {
            dispatch(updateWriteArticle({ summary: e.target.value }))
            dispatch(updateErrorMessage({ summary: '' }))
        }
    }

    return (
        <>
            <FormLabel
                sx={{
                    width: 100
                }}>
                Summary
            </FormLabel>
            <TextField
                error={!!summaryError}
                helperText={summaryError}
                fullWidth
                rows={3}
                multiline
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                    ),
                }}
                value={summary}
                onChange={handleSummaryChange}
            />
        </>
    )
}

export default ArticleSummaryInput