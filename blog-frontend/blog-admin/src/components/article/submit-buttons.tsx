import { Button, Stack, SvgIcon, Theme, useMediaQuery } from "@mui/material"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { RefObject, useCallback } from "react";
import { createArticle } from "../../redux/slices/article-slice";
import { updateErrorMessage } from "../../redux/slices/error-message-slice";
import { errorMessageMap } from "../../utils/error-utils";

interface Props {
    fileInputRef: RefObject<HTMLInputElement | undefined>
}

const createRequestData = (status: PublishStatus, article: WriteArticle, fileList: FileList | null | undefined): WriteArticleRequest => {

    const data: WriteArticleRequest = {
        ...article,
        publishStatus: status
    }
    if (fileList) {
        data.image = fileList[0]
    }

    return data
}



const SubmitButons = ({ fileInputRef }: Props) => {

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    const article = useSelector((state: RootState) => state.article.writeArticle)

    // const errorMessages = useSelector((state:RootState) => state.errorMessage.article)

    const dispatch = useDispatch<AppDispatch>()

    const validateData = useCallback((article: WriteArticle): boolean => {
        let valid = true
        for (const [key, value] of Object.entries(article)) {
            if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
                valid = false
                dispatch(updateErrorMessage({ [key]: errorMessageMap[key] }))
                break
            }
        }
        return valid
    }, [])

    const handlePublishClick = () => {
        const data = createRequestData("PUBLISHED", article, fileInputRef.current?.files)
        if (!validateData(data)) {
            return
        }
        dispatch(createArticle(data)).unwrap().then()
    }

    const handleDraftClick = async () => {
        const data = createRequestData("DRAFT", article, fileInputRef.current?.files)
        if (!validateData(data)) {
            return
        }
        dispatch(createArticle(data)).unwrap().then()
    }

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: smUp ? '' : 'space-between',
                gap: smUp ? 4 : 0
            }}
        >
            <Button
                variant="outlined"
                color="success"
                type="submit"
                startIcon={(
                    <SvgIcon fontSize="small">
                        <CheckIcon />
                    </SvgIcon>
                )}
                sx={{
                    bgcolor: 'white',
                    '&:hover': {
                        bgcolor: 'white'
                    }
                }}
                onClick={handlePublishClick}
            >
                Publish
            </Button>
            <Button
                variant="outlined"
                type="submit"
                startIcon={(
                    <SvgIcon fontSize="small">
                        <SaveAsIcon />
                    </SvgIcon>
                )}
                sx={{
                    bgcolor: 'white',
                    '&:hover': {
                        bgcolor: 'white'
                    }
                }}
                onClick={handleDraftClick}
            >
                Draft
            </Button>
        </Stack>


    )
}

export default SubmitButons