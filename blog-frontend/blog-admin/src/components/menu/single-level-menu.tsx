import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateRouterPath } from '../../redux/slices/router-path-slice';

interface Props {
    menu: Menu
}

const SingleLevelMenu = ({ menu }: Props) => {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(updateRouterPath({
            path: menu.component
        }))
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