import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Theme, useMediaQuery } from '@mui/material';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    pr: 4,
    maxHeight: '92dvh',
    overflowY: 'scroll'
};

interface Props {
    open: boolean
    handleClose(): void
    children: React.ReactNode
}


export default function MyModal({ open, handleClose, children }: Props) {

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

    return (
        <Modal
            disableScrollLock={false}
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                width={lgUp ? 550 : 400}
                sx={{
                    ...style,
                    scrollbarColor: 'black',
                    scrollbarWidth: '1px'
                }}
            >
                {children}
            </Box>
        </Modal>
    );
}
