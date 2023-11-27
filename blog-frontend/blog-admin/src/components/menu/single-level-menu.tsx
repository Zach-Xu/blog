import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
    menu: Menu
}

const SingleLevelMenu = ({ menu }: Props) => {

    const navigate = useNavigate()

    const clickHandler = () => {
        menu.routerPath && navigate(menu.routerPath)
    }

    return (
        <>
            < ListItemButton
                sx={{
                    mx: 2,
                    '&:hover': {
                        backgroundColor: '#252e3e'
                    },
                }}
                onClick={clickHandler}
            >
                {/* <ListItemIcon>
                    <SendIcon />
                </ListItemIcon> */}
                <ListItemText primary={menu.name} />
            </ListItemButton>
        </>
    )
}

export default SingleLevelMenu