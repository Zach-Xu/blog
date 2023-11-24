import { useDispatch, useSelector } from "react-redux"
import TagDropDown from "../tag-dropdown"
import { AppDispatch, RootState } from "../../../redux/store"
import { updateWriteArticle } from "../../../redux/slices/article-slice"
import { useCallback } from "react"

const WriteTagDropDown = () => {

    const tagIds = useSelector((state: RootState) => state.article.writeArticle.tagIds)

    const dispatch = useDispatch<AppDispatch>()

    const handleTagsChange = useCallback((tagIds: number[]) => {
        dispatch(updateWriteArticle({
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

export default WriteTagDropDown