import { Stack, FormLabel, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

interface Props {
    title: string | undefined
    titleChangeHandler(title: string): void
}

const ArticleTitleInput = ({ title, titleChangeHandler }: Props) => {

    const titleError = useSelector((state: RootState) => state.errorMessage.article.title)

    const dispatch = useDispatch()

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        titleChangeHandler(e.target.value)
        if (e.target.value.trim() !== '' && titleError !== '') {
            dispatch(updateErrorMessage({ title: '' }))
        }
    }

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2
        }}>
            <FormLabel sx={{
                width: 100
            }}>
                Title
            </FormLabel>
            <TextField
                value={title}
                onChange={handleTitleChange}
                error={!!titleError}
                helperText={titleError}
                sx={{
                    flexGrow: 1,
                }}
                variant="outlined"
            />
        </Stack>
    )
}

export default ArticleTitleInput