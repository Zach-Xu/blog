import { FormControl, FormHelperText, Theme, useMediaQuery } from "@mui/material"
import MDEditor from "@uiw/react-md-editor"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"
import Markdown from "../common/markdown"

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
                    components={{
                        preview: (source, state, dispatch) =>
                            <div className='min-w-0  flex-1 shadow-around-hover rounded-xl w-full bg-[#222]'>
                                <div className="p-6 md:p-8 lg:p-10 ">
                                    <Markdown content={content} />
                                </div>
                            </div>,
                    }}
                />

            </FormControl>
            {
                preview &&
                <div className='min-w-0  flex-1 shadow-around-hover rounded-xl w-full bg-[#222]'>
                    <div className="p-6 md:p-8 lg:p-10 ">
                        <Markdown content={content} />
                    </div>
                </div>
            }

        </>
    )
}

export default ArticleMarkdownEditor