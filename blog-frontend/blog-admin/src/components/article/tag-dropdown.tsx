import { Box, Chip, FormControl, FormHelperText, FormLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, Theme, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { tagService } from "../../services/resources/tag-service"
import { MenuProps, getStyles } from "../../utils/drop-down-utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateErrorMessage } from "../../redux/slices/error-message-slice";


const getTagName = (id: number, tags?: Tag[]): string => {
    if (!tags) {
        return ''
    }

    const tag = tags.find(tag => tag.id === id)

    if (tag) {
        return tag.name
    } else {
        console.error('System error, please contact admin')
        return ''
    }
}

interface Props {
    tagIds: number[]
    tagsChangeHandler(tagIds: number[]): void
}

const TagDropDown = ({ tagIds, tagsChangeHandler }: Props) => {

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const theme = useTheme()

    const [tags, setTags] = useState<Tag[]>()

    const tagIdError = useSelector((state: RootState) => state.errorMessage.article.tagIds)

    const dispatch = useDispatch()

    const handleChange = (e: SelectChangeEvent<typeof tagIds>) => {
        tagsChangeHandler(e.target.value as number[])
        if (tagIdError !== '') {
            dispatch(updateErrorMessage({ tagIds: '' }))
        }
    }

    useEffect(() => {
        const fetchTags = async () => {
            const result = await tagService.getAll()
            setTags(result)
        }

        fetchTags()
    }, [])

    return (
        <Stack sx={{
            width: mdUp ? '60%' : '100%',
        }}>

            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    ml: mdUp ? 5 : 0
                }}
                error={!!tagIdError}
            >
                <FormLabel sx={{
                    width: mdUp ? 50 : 100
                }}>
                    Tag
                </FormLabel>
                <Stack
                    sx={{
                        flexGrow: 1
                    }}
                >
                    <Select
                        sx={{
                            flex: '1 1 auto'
                        }}
                        multiple
                        value={tagIds}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={getTagName(value, tags)} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {
                            tags && tags.map((tag) => (
                                <MenuItem
                                    key={tag.id}
                                    value={tag.id}
                                    style={getStyles(tag.id, tagIds, theme)}
                                >
                                    {tag.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    {
                        tagIdError !== '' && <FormHelperText>{tagIdError}</FormHelperText>
                    }
                </Stack>
            </FormControl>
        </Stack>
    )
}

export default TagDropDown