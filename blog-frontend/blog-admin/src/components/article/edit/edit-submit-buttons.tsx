import { useCallback } from "react"
import SubmitButons from "../submit-buttons"
import { useValidation } from "../../../hooks/use-validation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateArticle, updateEditArticle } from "../../../redux/slices/article-slice"
import { useNavigate } from "react-router-dom"

const createRequestData = (id: number, status: PublishStatus, article: WriteArticle, fileList: FileList | null | undefined): UpdateArticleRequest => {

    const data: UpdateArticle = {
        ...article,
        publishStatus: status
    }

    if (fileList && fileList.length > 0) {
        data.image = fileList[0]
    } else {
        delete data.image
    }

    return {
        id,
        article: data
    }
}

interface Props {
    id: number
    fileInputRef: React.RefObject<HTMLInputElement>
}

const EditSubmitButtons = ({ id, fileInputRef }: Props) => {

    const article = useSelector((state: RootState) => state.article.editArticle)

    const dispatch = useDispatch<AppDispatch>()

    const validateDate = useValidation()

    const navigate = useNavigate()

    const handleClick = useCallback((status: PublishStatus) => {
        const data = createRequestData(id, status, article, fileInputRef.current?.files)
        if (!validateDate(data)) {
            return
        }

        dispatch(updateArticle(data)).
            unwrap().then(() => navigate('/article'))

    }, [article, fileInputRef.current])

    const handlePreview = useCallback(() => {
        dispatch(updateEditArticle({ preview: !article.preview }))
    }, [article.preview])

    return (
        <SubmitButons
            clickHandler={handleClick}
            previewHandler={handlePreview}
        />
    )
}

export default EditSubmitButtons