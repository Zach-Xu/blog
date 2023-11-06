import { Button, Stack, SvgIcon, Theme, useMediaQuery } from "@mui/material"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { RefObject, useCallback } from "react";
import { createArticle, updateWriteArticle } from "../../redux/slices/article-slice";
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

    if (fileList && fileList.length > 0) {
        data.image = fileList[0]
    } else {
        delete data.image
    }

    return data
}



const SubmitButons = ({ fileInputRef }: Props) => {

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    const article = useSelector((state: RootState) => state.article.writeArticle)

    const dispatch = useDispatch<AppDispatch>()

    const validateData = useCallback((article: WriteArticle): boolean => {
        let valid = true
        for (const [key, value] of Object.entries(article)) {

            if (typeof value === 'boolean') {
                continue
            }
            if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
                console.log('value thats not pass validation', key, value)
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

    const handlePreviewClick = () => {
        dispatch(updateWriteArticle({ preview: !article.preview }))
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
            <Button
                variant="outlined"
                color="secondary"
                startIcon={(
                    <SvgIcon fontSize="small">
                        <VisibilityIcon />
                    </SvgIcon>
                )}
                sx={{
                    bgcolor: 'white',
                    '&:hover': {
                        bgcolor: 'white'
                    }
                }}
                onClick={handlePreviewClick}
            >
                Preview
            </Button>
        </Stack>


    )
}

export default SubmitButons