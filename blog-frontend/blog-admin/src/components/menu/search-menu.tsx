import { useDispatch, useSelector } from "react-redux"
import Search from "../common/search"
import { AppDispatch, RootState } from "../../redux/store"
import { useCallback } from "react"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { getMenusInTree, updateSearchName, updateSearchStatus } from "../../redux/slices/menu-slice"


const SearchMenu = () => {

    const name = useSelector((state: RootState) => state.menu.search.name)
    const enable = useSelector((state: RootState) => state.menu.search.enable)

    const dispatch = useDispatch<AppDispatch>()

    const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchName = event.target.value.trim()
            dispatch(updateSearchName(searchName))
            dispatch(getMenusInTree({
                name: searchName,
                enable
            }))
        }
    }, [enable])

    const handleClick = useCallback((searchName: string) => {

        dispatch(getMenusInTree({
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
            name='Menu name'
            placeholder='Menu name'
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

export default SearchMenu