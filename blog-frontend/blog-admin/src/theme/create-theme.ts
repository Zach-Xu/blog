import {
    createTheme,
    filledInputClasses,
    paperClasses,
    tableCellClasses,
    outlinedInputClasses
} from '@mui/material';
import { palette } from './create-palette';

const muiTheme = createTheme();

export const theme = createTheme({
    components: {
        // Name of the component
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                    backgroundColor: 'rgb(112, 115, 243)',
                    '&:hover': {
                        backgroundColor: 'rgb(99, 102, 241)'
                    },
                },
                sizeSmall: {
                    padding: '6px 16px'
                },
                sizeMedium: {
                    padding: '8px 20px'
                },
                sizeLarge: {
                    padding: '11px 24px'
                },
                textSizeSmall: {
                    padding: '7px 12px'
                },
                textSizeMedium: {
                    padding: '9px 16px'
                },
                textSizeLarge: {
                    padding: '12px 16px'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    [`&.${paperClasses.elevation1}`]: {
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
                    }
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px'
                    }
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6'
                },
                subheaderTypographyProps: {
                    variant: 'body2'
                }
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px 16px'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: palette.menu.selected
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: palette.menu.selected
                    }
                },
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box'
                },

                '*::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '*::-webkit-scrollbar-track': {
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    outline: '1px solid slategrey'
                },

                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                    '&::placeholder': {
                        color: palette.text.secondary
                    }
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderColor: palette.neutral[200],
                    transition: muiTheme.transitions.create([
                        'border-color',
                        'box-shadow'
                    ]),
                    '&:hover': {
                        backgroundColor: palette.action.hover
                    },
                    '&:before': {
                        display: 'none'
                    },
                    '&:after': {
                        display: 'none'
                    },
                    [`&.${filledInputClasses.disabled}`]: {
                        backgroundColor: 'transparent'
                    },
                    [`&.${filledInputClasses.focused}`]: {
                        backgroundColor: 'transparent',
                        borderColor: palette.primary.main,
                        boxShadow: `${palette.primary.main} 0 0 0 2px`
                    },
                    [`&.${filledInputClasses.error}`]: {
                        borderColor: palette.error.main,
                        boxShadow: `${palette.error.main} 0 0 0 2px`
                    }
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    [`& .${outlinedInputClasses.notchedOutline}`]: {
                        border: `1px solid ${palette.color.grey[400]}`,
                        transitionDuration: '0s'
                    },
                    '&:hover': {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.color.blue[400]
                        }
                    },
                    [`&.${outlinedInputClasses.focused}`]: {
                        backgroundColor: 'transparent',
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            border: `1px solid ${palette.color.blue[400]}`,
                            boxShadow: `0 0 0 2px ${palette.color.blue[200]}`
                        }
                    },
                    [`&.${filledInputClasses.error}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.error.main,
                            boxShadow: `${palette.error.main} 0 0 0 2px`
                        }
                    }
                },
                input: {
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
                notchedOutline: {
                    borderColor: palette.neutral[200],
                    transition: muiTheme.transitions.create([
                        'border-color',
                        'box-shadow'
                    ])
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.71,
                    minWidth: 'auto',
                    paddingLeft: 0,
                    paddingRight: 0,
                    textTransform: 'none',
                    '& + &': {
                        marginLeft: 24
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: palette.divider,
                    padding: '15px 16px'
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                        backgroundColor: palette.neutral[50],
                        color: palette.neutral[700],
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase'
                    },
                    [`& .${tableCellClasses.paddingCheckbox}`]: {
                        paddingTop: 4,
                        paddingBottom: 4
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: `1px solid ${palette.color.grey[400]}`,
                        },
                        '&:hover fieldset': {
                            borderColor: palette.color.blue[400],
                        }
                    },
                    transitionDuration: '0s'
                }
            },
            defaultProps: {
                variant: 'outlined'
            }
        }
    }
});
