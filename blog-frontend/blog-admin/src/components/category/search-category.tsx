import { useDispatch, useSelector } from "react-redux"
import { updateSearchName, updateSearchStatus } from "../../redux/slices/category-slice"
import Search from "../common/search"
import { AppDispatch, RootState } from "../../redux/store"
import { useCallback } from "react"
import { getCategories } from "../../redux/slices/category-slice"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"

interface Props {
    radioChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchCategory = ({ }: Props) => {

    const name = useSelector((state: RootState) => state.category.search.name)
    const enable = useSelector((state: RootState) => state.category.search.enable)

    const dispatch = useDispatch<AppDispatch>()

    const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchName = event.target.value.trim()
            dispatch(updateSearchName(searchName))
            dispatch(getCategories({
                name: searchName,
                enable
            }))
        }
    }, [enable])

    const handleClick = useCallback((searchName: string) => {

        dispatch(getCategories({
            name: searchName,
            enable,
        }))
    }, [enable])

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchStatus(e.target.value === 'true'))
    }

    const handleLabelClick = (e: React.ChangeEvent<any>) => {
        const current = e.target.value === 'true'
        const unselect = enable === current
        if (unselect) {
            dispatch(updateSearchStatus(null))
        }
    }

    return (
        <Search
            searchName={name}
            onKeyUpHandler={handleKeyUp}
            clickHandler={handleClick}
            name='Category name'
            placeholder='category name'
        >
            <RadioGroup
                unselectable="on"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    ml: 2
                }}
                name={'enable'}
                value={enable}
                onChange={handleRadioChange}
            >
                <FormControlLabel value={true} control={<Radio />} onClick={handleLabelClick} label="Enable" />
                <FormControlLabel value={false} control={<Radio />} onClick={handleLabelClick} label="Disable" />
            </RadioGroup>
        </Search>
    )
}

export default SearchCategory