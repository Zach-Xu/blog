import { Theme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
}

export const getStyles = (name: number, items: number[] | undefined, theme: Theme) => (
    items ?
        {
            fontWeight:
                items.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        }
        :
        {
            fontWeight: theme.typography.fontWeightRegular
        }
)

