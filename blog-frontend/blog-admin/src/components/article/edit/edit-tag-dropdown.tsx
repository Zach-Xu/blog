import { useDispatch, useSelector } from "react-redux"
import TagDropDown from "../tag-dropdown"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateEditArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const EditTagDropDown = () => {

    const tagIds = useSelector((state: RootState) => state.article.editArticle.tagIds)

    const dispatch = useDispatch<AppDispatch>()

    const handleTagsChange = useCallback((tagIds: number[]) => {
        dispatch(updateEditArticle({
            tagIds
        }))
    }, [])

    return (
        <TagDropDown
            tagIds={tagIds}
            tagsChangeHandler={handleTagsChange}
        />
    )
}

export default EditTagDropDown