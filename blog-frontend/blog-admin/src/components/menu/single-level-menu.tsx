import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateRouterPath } from '../../redux/slices/router-path-slice';
import { useNavigate } from 'react-router-dom';

interface Props {
    menu: Menu
}

const SingleLevelMenu = ({ menu }: Props) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const clickHandler = () => {
        dispatch(updateRouterPath({
            path: menu.component
        }))

        alert(menu.routerPath)

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