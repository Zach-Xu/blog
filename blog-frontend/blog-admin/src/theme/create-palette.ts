import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

export const palette = {

    color: {
        blue: {
            100: '#DAECFF',
            200: '#b6daff',
            400: '#3399FF',
            500: '#007FFF',
            600: '#0072E5',
            900: '#003A75',
        },
        grey: {
            50: '#F3F6F9',
            100: '#E5EAF2',
            200: '#DAE2ED',
            300: '#C7D0DD',
            400: '#B0B8C4',
            500: '#9DA8B7',
            600: '#6B7A90',
            700: '#434D5B',
            800: '#303740',
            900: '#1C2025',
        }
    },

    action: {
        active: neutral[500],
        disabled: alpha(neutral[900], 0.38),
        disabledBackground: alpha(neutral[900], 0.12),
        focus: alpha(neutral[900], 0.16),
        hover: alpha(neutral[900], 0.04),
        selected: alpha(neutral[900], 0.12)
    },
    background: {
        default: common.white,
        paper: common.white
    },
    menu: {
        selected: '#252e3e'
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary: indigo,
    success,
    text: {
        primary: neutral[900],
        secondary: neutral[500],
        disabled: alpha(neutral[900], 0.38)
    },
    warning
};
