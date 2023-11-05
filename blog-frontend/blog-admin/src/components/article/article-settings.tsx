import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateWriteArticle } from "../../redux/slices/article-slice"

const ArticleSettings = () => {

    const allowedComment = useSelector((state: RootState) => state.article.writeArticle.allowedComment)
    const pinned = useSelector((state: RootState) => state.article.writeArticle.pinned)

    const dispatch = useDispatch()

    const handleAllowCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateWriteArticle({ allowedComment: e.target.value === 'true' }))
    }

    const handlePinnedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateWriteArticle({ pinned: e.target.value === 'true' }))
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <FormControl required>
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
            </FormControl>

            <FormControl required>
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
            </FormControl>
        </Box>

    )
}

export default ArticleSettings