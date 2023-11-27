import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Scrollbar } from "../common/scrollbar";
import { getMenusInTree } from "../../redux/slices/menu-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import MenuRow from "./menu-table-row";


const MenuTable = () => {

    const menus = useSelector((state: RootState) => state.menu.menus)

    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        const fetchMenusTree = async () => {
            dispatch(getMenusInTree({}))
        }
        fetchMenusTree()
    }, [])


    return (
        <Box
            component='main'
        >
            <Stack
                spacing={5}
                sx={{
                    px: 2
                }}
            >
                <Scrollbar>
                    <Box sx={{
                        minWidth: 800,
                    }}>

                        <Table  >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Menu name
                                    </TableCell>
                                    <TableCell>
                                        Order
                                    </TableCell>
                                    <TableCell>
                                        Permission
                                    </TableCell>
                                    <TableCell>
                                        Router path
                                    </TableCell>
                                    <TableCell>
                                        Enable
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {

                                <TableBody>
                                    {menus.map((menu) =>
                                    (
                                        <MenuRow menu={menu} key={menu.id} />)
                                    )}
                                </TableBody>

                            }

                        </Table>

                    </Box>
                </Scrollbar>

            </Stack>
        </Box >
    )
}

export default MenuTable