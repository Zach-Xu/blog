import { useDispatch, useSelector } from "react-redux"
import { updateSearch } from "../../redux/slices/category-slice"
import Search from "../common/search"
import { AppDispatch, RootState } from "../../redux/store"
import { useCallback, useState } from "react"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"


const SearchCategory = () => {

    const name = useSelector((state: RootState) => state.category.search.name)
    const enable = useSelector((state: RootState) => state.category.search.enable)

    const [localEnable, setLocalEnable] = useState(enable)

    const dispatch = useDispatch<AppDispatch>()

    const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const searchName = event.target.value.trim()
            dispatch(updateSearch({
                name: searchName,
                enable: localEnable
            }))
        }
    }, [localEnable])

    const handleClick = useCallback((searchName: string) => {
        dispatch(updateSearch({
            name: searchName,
            enable: localEnable
        }))
    }, [localEnable])

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalEnable(e.target.value === 'true')
    }

    const handleLabelClick = (e: React.ChangeEvent<any>) => {
        const current = e.target.value === 'true'
        const unselect = localEnable === current
        if (unselect) {
            setLocalEnable(null)
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
                value={localEnable}
                onChange={handleRadioChange}
            >
                <FormControlLabel value={true} control={<Radio />} onClick={handleLabelClick} label="Enable" />
                <FormControlLabel value={false} control={<Radio />} onClick={handleLabelClick} label="Disable" />
            </RadioGroup>
        </Search>
    )
}

export default SearchCategory