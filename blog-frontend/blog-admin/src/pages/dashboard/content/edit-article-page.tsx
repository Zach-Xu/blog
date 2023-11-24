import { Box, Stack, Theme, useMediaQuery } from "@mui/material"
import DashboardLayout from "../../../layouts/dashboard/layout"
import ImageUpload from "../../../components/common/image-upload";
import { useEffect, useRef } from "react";
import { articleService } from "../../../services/resources/article-service";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { initEditArticle } from "../../../redux/slices/article-slice";
import EditTitleInput from "../../../components/article/edit/edit-title-input";
import EditCategoryDropDown from "../../../components/article/edit/edit-category-dropdown";
import EditTagDropDown from "../../../components/article/edit/edit-tag-dropdown";
import EditSummaryInput from "../../../components/article/edit/edit-summary-input";
import EditSettings from "../../../components/article/edit/edit-settings";
import EditContentEditor from "../../../components/article/edit/edit-content-editor";
import EditSubmitButtons from "../../../components/article/edit/edit-submit-buttons";


const EditArticlePage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [searchParams] = useSearchParams()

    const articleId = searchParams.get('id')

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!articleId) {
            return
        }
        const fetchArticleDetails = async (id: number) => {
            const article = await articleService.getArticleDetails(id)
            dispatch(initEditArticle(article))
        }
        fetchArticleDetails(+articleId)
    }, [])

    return (
        (!articleId || isNaN(+articleId)) ?
            <Navigate to={'/article'} />
            :
            <DashboardLayout>
                <Box sx={{
                    py: 2,
                    px: 4
                }}>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <EditTitleInput />
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: mdUp ? 'row' : 'column',
                                gap: 2,
                                flexGrow: 1
                            }}
                        >
                            <EditCategoryDropDown />
                            <EditTagDropDown />
                        </Stack>
                        <EditSummaryInput />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: smUp ? 'row-reverse' : 'column',
                                justifyContent: smUp ? 'space-between' : '',
                                alignItems: smUp ? 'center' : '',
                                gap: smUp ? 5 : 0,
                            }}
                        >
                            <EditSettings />
                            <ImageUpload
                                ref={fileInputRef}
                                type="EDIT"
                            />
                        </Box>
                        <EditSubmitButtons
                            fileInputRef={fileInputRef}
                            id={+articleId}
                        />
                        <EditContentEditor />
                    </Stack>
                </Box>
            </DashboardLayout>
    )
}

export default EditArticlePage