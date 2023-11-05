import { Box, Stack, Theme, useMediaQuery } from "@mui/material"
import Layout from "../../../layouts/dashboard/layout"
import ImageUpload from "../../../components/common/image-upload";
import CategoryDropDown from "../../../components/article/category-dropdown";
import TagDropDown from "../../../components/article/tag-dropdown";
import ArticleMarkdownEditor from "../../../components/article/article-md-editor";
import ArticleSummaryInput from "../../../components/article/article-summary-input";
import ArticleSettings from "../../../components/article/article-settings";
import SubmitButons from "../../../components/article/submit-buttons";
import { useRef } from "react";
import ArticleTitleInput from "../../../components/article/article-title-input";



const WriteArticlePage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <Layout>
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
                    <ArticleTitleInput />
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: mdUp ? 'row' : 'column',
                            gap: 2,
                            flexGrow: 1
                        }}
                    >
                        <CategoryDropDown mdUp={mdUp} />
                        <TagDropDown mdUp={mdUp} />
                    </Stack>

                    <ArticleSummaryInput />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: smUp ? 'row-reverse' : 'column',
                            justifyContent: smUp ? 'space-between' : '',
                            alignItems: smUp ? 'center' : '',
                            gap: smUp ? 5 : 0,
                        }}
                    >
                        <ArticleSettings />
                        <ImageUpload ref={fileInputRef} />
                    </Box>
                    <SubmitButons fileInputRef={fileInputRef} />
                    <ArticleMarkdownEditor />
                </Stack>
            </Box>
        </Layout>
    )
}

export default WriteArticlePage