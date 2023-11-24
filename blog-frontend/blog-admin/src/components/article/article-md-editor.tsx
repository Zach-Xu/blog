import { Box, FormControl, FormHelperText, Theme, useMediaQuery } from "@mui/material"
import MDEditor from "@uiw/react-md-editor"
import { palette } from "../../theme/create-palette"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

interface Props {
    content: string
    preview: boolean
    contentChangeHandler(content: string | undefined): void
}

const ArticleMarkdownEditor = ({ content, preview, contentChangeHandler }: Props) => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const contentError = useSelector((state: RootState) => state.errorMessage.article.content)

    const dispatch = useDispatch()

    const handleContentChange = (value: string | undefined) => {
        contentChangeHandler(value)
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