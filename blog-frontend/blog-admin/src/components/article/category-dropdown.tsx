import { FormControl, FormHelperText, FormLabel, MenuItem, Select, SelectChangeEvent, Stack, Theme, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { categoryService } from "../../services/resources/category-service"
import { MenuProps } from "../../utils/drop-down-utils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { updateErrorMessage } from "../../redux/slices/error-message-slice"

interface Props {
    categoryId: number | undefined
    categoryChangeHandler(id: number): void
}


const CategoryDropDown = ({ categoryId, categoryChangeHandler }: Props) => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const [categories, setCategories] = useState<Category[]>()

    const categoryError = useSelector((state: RootState) => state.errorMessage.article.categoryId)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await categoryService.getAll()
            setCategories(result)
        }

        fetchCategories()
    }, [])

    const handleChange = (e: SelectChangeEvent<number>) => {
        categoryChangeHandler(e.target.value as number)

        if (categoryError !== '') {
            dispatch(updateErrorMessage({ categoryId: '' }))
        }
    }

    return (
        <Stack sx={{
            width: mdUp ? '40%' : '100%',
        }}>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                }}
                error={!!categoryError}
            >
                <FormLabel sx={{
                    width: 100
                }}>
                    Category
                </FormLabel>
                <Stack
                    sx={{
                        flexGrow: 1
                    }}
                >
                    {
                        categories &&
                        <Select
                            MenuProps={MenuProps}
                            value={categoryId || ''}
                            onChange={handleChange}
                            sx={{
                                pl: 1,
                                flexGrow: 1
                            }}
                        >
                            {
                                categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    }

                    {
                        categoryError !== '' && <FormHelperText>{categoryError}</FormHelperText>
                    }

                </Stack>
            </FormControl>
        </Stack>
    )
}

export default CategoryDropDown