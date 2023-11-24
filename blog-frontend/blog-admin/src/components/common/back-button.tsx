import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <IconButton color="primary" aria-label="go back"
            onClick={goBack}
        >
            <ArrowBackIcon />
        </IconButton>
    )
}

export default BackButton