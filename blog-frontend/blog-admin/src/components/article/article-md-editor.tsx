import { Box, Button, Theme, useMediaQuery } from "@mui/material"
import MDEditor from "@uiw/react-md-editor"
import { palette } from "../../theme/create-palette"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateWriteArticle } from "../../redux/slices/article-slice"
import { useState } from "react"

const ArticleMarkdownEditor = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const content = useSelector((state: RootState) => state.article.writeArticle.content)

    const [preview, setPreview] = useState(false)

    const dispatch = useDispatch()

    const handleContentChange = (val: string | undefined) => {
        dispatch(updateWriteArticle({ content: val }))
    }

    return (
        <>
            <MDEditor
                value={content}
                onChange={handleContentChange}
                preview={mdUp ? 'live' : 'edit'}
                height={mdUp ? 400 : 275}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${palette.color.grey[400]}`,
                    p: 2,
                    borderRadius: 1,
                    ':hover': {
                        border: `1px solid ${palette.color.blue[400]}`
                    }
                }}
            >
                <Button
                    onClick={() => setPreview(preview => !preview)}
                    disableRipple={true}
                    sx={{
                        bgcolor: 'transparent',
                        color: palette.color.blue[400],
                        transitionDuration: '0s',
                        ':hover': {
                            color: palette.color.blue[600],
                            bgcolor: 'transparent'
                        },
                        p: 0
                    }}
                >
                    Markdown Preview
                </Button>
                {
                    preview && <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
                }
            </Box>
        </>
    )
}

export default ArticleMarkdownEditor