import { FormLabel, InputAdornment, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

interface Props {
    summary: string | undefined
    summaryChangeHandler(summary: string): void
}

const ArticleSummaryInput = ({ summary, summaryChangeHandler }: Props) => {



    const dispatch = useDispatch()

    const summaryError = useSelector((state: RootState) => state.errorMessage.article.summary)

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        summaryChangeHandler(e.target.value)
        if (e.target.value.trim() !== '' && summaryError !== '') {
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