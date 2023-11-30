import * as React from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view/TreeItem';
import { useEffect, useState } from 'react';
import { menuService } from '../../services/resources/menu-service';
import { Checkbox, Typography } from '@mui/material';
import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { allSiblingsCheck, getAncestorIds, getTreeIds } from '../../utils/tree-utils';

declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

const CustomContent = React.forwardRef(function CustomContent(
    props: TreeItemContentProps & {
        checked?: boolean
        checkedChangeHandler?(): void
    },
    ref,
) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
        checked,
        checkedChangeHandler
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        preventSelection(event);
    };

    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        handleExpansion(event);
    };

    const handleSelectionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        handleSelection(event);
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            onMouseDown={handleMouseDown}
            ref={ref as React.Ref<HTMLDivElement>}
        >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={handleExpansionClick} className={classes.iconContainer}>
                {icon}
            </div>
            <Checkbox
                checked={checked}
                onChange={checkedChangeHandler}
                sx={{
                    width: 14,
                    height: 14
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography
                onClick={handleSelectionClick}
                component="div"
                className={classes.label}
            >
                {label}
            </Typography>
        </div>
    );
});

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: TreeItemProps & {
        ContentProps?: {
            checked: boolean
            checkedChangeHandler(): void
        }
    },
    ref: React.Ref<HTMLLIElement>,
) {
    return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});


const MenuTreeView = () => {

    const [menus, setMenus] = useState<Menu[]>([])

    const [selected, setSelected] = useState<number[]>([])

    useEffect(() => {
        const fetchMenus = async () => {
            const menus = await menuService.getMenusInTree({})
            setMenus(menus)
        }
        fetchMenus()
    }, [])

    const recursiveRenderTree = (menuTree: Menu[]) => {

        return (
            menuTree.map(menu => {
                const checked = selected.some(id => id === menu.id)
                const treeIds = getTreeIds(menu)
                const checkedChangeHandler = () => {
                    if (checked) {
                        // uncheck by removing parent and menus in the tree from the array
                        setSelected(() => selected.filter(id => !treeIds.includes(id) && !getAncestorIds(menu, menus).includes(id)))
                    } else {
                        // check by adding current menu and its children to the array
                        setSelected(() => {
                            const ids = treeIds.concat(selected.filter(id => !treeIds.includes(id)))
                            // if its siblings are all checked, check parent as well
                            if (allSiblingsCheck(menu, selected, menus)) {
                                ids.push(menu.parentId)
                            }
                            return ids
                        })

                    }
                }

                return (
                    <CustomTreeItem nodeId={menu.id + ""} label={menu.name} ContentProps={{
                        checked,
                        checkedChangeHandler
                    }}  >
                        {
                            menu.subMenus && menu.subMenus.length > 0 &&
                            recursiveRenderTree(menu.subMenus)
                        }
                    </CustomTreeItem>
                )
            })
        )
    }

    return (
        <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
                aria-label="icon expansion"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ overflowX: 'hidden' }}
            >
                {
                    recursiveRenderTree(menus)
                }

            </TreeView>
        </Box>
    )
}

export default MenuTreeView