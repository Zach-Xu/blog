import { Button, Stack, SvgIcon, Theme, useMediaQuery } from "@mui/material"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
    clickHandler(status: PublishStatus): void
    previewHandler(): void
}

const SubmitButons = ({ clickHandler, previewHandler }: Props) => {

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    const handlePublishClick = () => {
        clickHandler("PUBLISHED")
    }

    const handleDraftClick = () => {
        clickHandler("DRAFT")
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
                onClick={previewHandler}
            >
                Preview
            </Button>
        </Stack>


    )
}

export default SubmitButons