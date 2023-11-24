import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

interface Props {
    allowedComment: boolean
    pinned: boolean
    allowedCommentChangeHandler(flag: boolean): void
    pinnedChangeHandler(flag: boolean): void
}

const ArticleSettings = ({ allowedComment, pinned, allowedCommentChangeHandler, pinnedChangeHandler }: Props) => {

    const allowCommentError = useSelector((state: RootState) => state.errorMessage.article.allowedComment)
    const pinnedError = useSelector((state: RootState) => state.errorMessage.article.pinned)

    const dispatch = useDispatch()

    const handleAllowCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        allowedCommentChangeHandler(e.target.value === 'true')
        if (allowCommentError !== '') {
            dispatch(updateErrorMessage({ allowedComment: '' }))
        }
    }

    const handlePinnedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        pinnedChangeHandler(e.target.value === 'true')
        if (pinnedError !== '') {
            dispatch(updateErrorMessage({ pinned: '' }))
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <FormControl
                error={!!allowCommentError}
            >
                <FormLabel >Allow comment</FormLabel>
                <RadioGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    value={allowedComment}
                    onChange={handleAllowCommentChange}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
                {
                    allowCommentError !== '' && <FormHelperText>{allowCommentError}</FormHelperText>
                }
            </FormControl>

            <FormControl
                error={!!pinnedError}
            >
                <FormLabel>Pin article</FormLabel>
                <RadioGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    value={pinned}
                    onChange={handlePinnedChange}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
                {
                    pinnedError !== '' && <FormHelperText>{pinnedError}</FormHelperText>
                }
            </FormControl>
        </Box>

    )
}

export default ArticleSettings