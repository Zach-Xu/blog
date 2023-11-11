import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Error, } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
    open: boolean
    handleClose(): void
    confirmAction(): void
    deleteMessage: string
}

const AlertDialog = ({ open, handleClose, confirmAction, deleteMessage }: Props) => {

    const { isLoading } = useSelector((state: RootState) => state.loading)

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    borderRadius: 1,
                    width: 400
                }
            }}

        >
            <DialogTitle id="alert-dialog-title" >
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    {"System Info"}
                    <IconButton
                        aria-label="delete"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>

                </Stack>
            </DialogTitle>
            <DialogContent >
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2
                }}>
                    <Error sx={{ color: '#e5a33f' }} />
                    <DialogContentText id="alert-dialog-description">
                        {deleteMessage}
                    </DialogContentText>
                </Stack>
            </DialogContent>
            <DialogActions sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1
            }}>
                <Button
                    variant="outlined"
                    sx={{
                        bgcolor: 'white',
                        '&:hover': {
                            bgcolor: 'white'
                        }
                    }}
                    onClick={handleClose}>Cancel</Button>
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    onClick={confirmAction} autoFocus>
                    Confirm
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog