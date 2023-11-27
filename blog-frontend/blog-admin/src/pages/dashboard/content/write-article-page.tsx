import { Box, Stack, Theme, useMediaQuery } from "@mui/material"
import ImageUpload from "../../../components/common/image-upload";
import { useRef } from "react";
import WriteTitleInput from "../../../components/article/write/write-title-input";
import WriteCategoryDropDown from "../../../components/article/write/write-category-dropdown";
import WriteTagDropDown from "../../../components/article/write/write-tag-dropdown";
import WriteSummaryInput from "../../../components/article/write/write-summary-input";
import WriteSettings from "../../../components/article/write/write-settings";
import WriteContentEditor from "../../../components/article/write/write-content-editor";
import WriteSubmitButtons from "../../../components/article/write/write-submit-buttons";


const WriteArticlePage = () => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
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
                <WriteTitleInput />
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: mdUp ? 'row' : 'column',
                        gap: 2,
                        flexGrow: 1
                    }}
                >
                    <WriteCategoryDropDown />
                    <WriteTagDropDown />
                </Stack>
                <WriteSummaryInput />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: smUp ? 'row-reverse' : 'column',
                        justifyContent: smUp ? 'space-between' : '',
                        alignItems: smUp ? 'center' : '',
                        gap: smUp ? 5 : 0,
                    }}
                >
                    <WriteSettings />
                    <ImageUpload
                        ref={fileInputRef}
                        type="WRITE"
                    />
                </Box>
                <WriteSubmitButtons
                    fileInputRef={fileInputRef}
                />
                <WriteContentEditor />
            </Stack>
        </Box>
    )
}

export default WriteArticlePage