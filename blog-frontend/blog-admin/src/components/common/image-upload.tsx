import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button/Button';
import { DragEvent, forwardRef, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { Box, FormLabel, Stack, SvgIcon } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';
import { validateImage } from '../../utils/file-utils';
import { palette } from '../../theme/create-palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '200px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: '100%',
    zIndex: 20
})

interface Props {
    type: "WRITE" | "EDIT"
}

const ImageUpload = forwardRef<HTMLInputElement, Props>(({ type }, ref) => {

    const imgRef = useRef<HTMLImageElement>(null)
    const uploadIconRef = useRef<HTMLLabelElement>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [isOver, setIsOver] = useState(false)
    const [showImg, setShowImg] = useState(type === "EDIT")

    const thumbnail = useSelector((state: RootState) => state.article.editArticle.thumbnail)

    const handleResetClick = () => {
        if (imgRef.current && thumbnail) {
            imgRef.current.src = thumbnail
        }
        setShowImg(true)
    }

    useEffect(() => {
        if (type === "WRITE") {
            return
        }

        if (imgRef.current && thumbnail) {
            imgRef.current.src = thumbnail
        }

    }, [thumbnail])

    const removeImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        setShowImg(false)
    }

    const handleUploadIconClick = () => {
        if (uploadIconRef.current) {
            uploadIconRef.current.click()
        }
    }

    const HandleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowImg(true)
        if (e.target.files) {
            const uploadFile = e.target.files[0]

            if (!validateImage(uploadFile)) {
                return
            }

            if (fileInputRef.current && imgRef.current) {
                const imageSrc = URL.createObjectURL(uploadFile)
                imgRef.current.setAttribute('src', imageSrc)
            }
        }
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsOver(true)
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsOver(false)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsOver(false)
        setShowImg(true)

        if (event.dataTransfer.files.length > 1) {
            return toast.error('You can only upload one image')
        }

        const droppedFiles = Array.from(event.dataTransfer.files)

        if (droppedFiles[0]) {
            if (!validateImage(droppedFiles[0])) {
                return
            }
            if (fileInputRef.current && imgRef.current) {
                const imageSrc = URL.createObjectURL(droppedFiles[0])
                const dT = new DataTransfer()
                dT.items.add(droppedFiles[0])
                fileInputRef.current.files = dT.files
                imgRef.current.setAttribute('src', imageSrc)
            }

        }
    }


    return (
        <Stack
            sx={{
                flexGrow: 1,
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                caretColor: 'transparent',
            }}
        >
            <FormLabel
                sx={{
                    width: 100
                }}>
                Cover Image
            </FormLabel>
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    width: '100%',
                    maxWidth: 700,
                    border: `1px solid ${palette.color.grey[400]}`,
                    borderRadius: 1,
                    backgroundColor: isOver ? 'lightgray' : 'white',
                    ':hover': {
                        borderColor: `${palette.color.blue[400]}`
                    }
                }}
            >
                {
                    type === 'EDIT' &&
                    <Button
                        variant="outlined"
                        color="info"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <RestartAltOutlinedIcon />
                            </SvgIcon>
                        )}
                        sx={{
                            display: showImg ? 'none' : '',
                            bgcolor: 'white',
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            '&:hover': {
                                bgcolor: 'white'
                            }
                        }}
                        onClick={handleResetClick}
                    >
                        Reset
                    </Button>
                }

                <IconButton
                    onClick={removeImage}
                    aria-label="delete"
                    sx={{
                        display: showImg ? '' : 'none',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        ':hover': {
                            bgcolor: 'transparent',
                            cursor: 'pointer'
                        },

                    }}
                    color='error'
                >
                    < ClearOutlinedIcon />
                </IconButton>

                <Box
                    sx={{
                        height: '100%',
                        display: showImg ? 'none' : 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <IconButton
                        disableRipple
                        onClick={handleUploadIconClick}
                        sx={{

                            ':hover': {
                                bgcolor: 'transparent'
                            }
                        }}
                    >
                        <CloudUploadIcon
                            sx={{
                                fontSize: 75
                            }}
                        />
                    </IconButton>

                    <Stack sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        Drag and drop file here, or
                        <Button
                            ref={uploadIconRef}
                            component="label"
                            sx={{
                                position: 'static',
                                bgcolor: 'transparent',
                                ":hover": {
                                    bgcolor: 'transparent'
                                },
                                height: '100%',
                                p: 0,
                                m: 0,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            variant="text"
                        >
                            &nbsp;upload file
                            <VisuallyHiddenInput
                                multiple={false}
                                ref={(instance: HTMLInputElement) => {
                                    fileInputRef.current = instance
                                    if (typeof ref === "function") {
                                        ref(instance)
                                    }
                                    else if (ref !== null) {
                                        ref.current = instance
                                    }
                                }}
                                type="file"
                                accept='.jpg, .png'
                                onChange={HandleFileInputChange} />
                        </Button>
                    </Stack>
                </Box>
                <Box
                    component='img'
                    src=''
                    sx={{
                        display: showImg ? '' : 'none',
                        maxWidth: '90%',
                        maxHeight: '90%',
                    }}
                    ref={imgRef}
                >
                </Box>
            </Box>
        </Stack>
    );
})
export default ImageUpload