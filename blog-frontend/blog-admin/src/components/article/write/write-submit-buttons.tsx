import { useCallback } from "react"
import SubmitButons from "../submit-buttons"
import { useValidation } from "../../../hooks/use-validation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { createArticle, getArticles, updateWriteArticle } from "../../../redux/slices/article-slice"
import { useNavigate } from "react-router-dom"


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

interface Props {
    fileInputRef: React.RefObject<HTMLInputElement>
}

const WriteSubmitButtons = ({ fileInputRef }: Props) => {

    const dispatch = useDispatch<AppDispatch>()

    const validateDate = useValidation()

    const navigate = useNavigate()

    const article = useSelector((state: RootState) => state.article.writeArticle)

    const handleClick = useCallback((status: PublishStatus) => {
        const data = createRequestData(status, article, fileInputRef.current?.files)
        if (!validateDate(data)) {
            return
        }

        dispatch(createArticle(data)).
            unwrap().then(() => {
                dispatch(getArticles({})).unwrap().then(() => navigate('/content/article'))
            })

    }, [article, fileInputRef.current])

    const handlePreview = useCallback(() => {
        dispatch(updateWriteArticle({ preview: !article.preview }))
    }, [article.preview])

    return (
        <SubmitButons
            clickHandler={handleClick}
            previewHandler={handlePreview}
        />
    )
}

export default WriteSubmitButtons