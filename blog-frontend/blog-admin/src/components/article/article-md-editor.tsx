import { Box, FormControl, FormHelperText, Theme, useMediaQuery } from "@mui/material"
import MDEditor from "@uiw/react-md-editor"
import { palette } from "../../theme/create-palette"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateWriteArticle } from "../../redux/slices/article-slice"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

const ArticleMarkdownEditor = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const content = useSelector((state: RootState) => state.article.writeArticle.content)

    const contentError = useSelector((state: RootState) => state.errorMessage.article.content)

    const preview = useSelector((state: RootState) => state.article.writeArticle.preview)


    const dispatch = useDispatch()

    const handleContentChange = (val: string | undefined) => {
        dispatch(updateWriteArticle({ content: val }))
        if (contentError !== '') {
            dispatch(updateErrorMessage({ content: '' }))
        }
    }

    return (
        <>
            <FormControl
                error={!!contentError}
            >
                {
                    contentError !== '' && <FormHelperText>{contentError}</FormHelperText>
                }
                <MDEditor
                    style={{
                        border: contentError === '' ? '' : '1px solid red'
                    }}
                    value={content}
                    textareaProps={{
                        placeholder: "**Write down your thoughts here!!!**"
                    }}
                    onChange={handleContentChange}
                    preview={mdUp ? 'live' : 'edit'}
                    height={mdUp ? 400 : 275}
                />

            </FormControl>
            {
                preview &&
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
                    <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
                </Box>
            }

        </>
    )
}

export default ArticleMarkdownEditor