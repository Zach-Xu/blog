import * as React from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view/TreeItem';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Checkbox, Typography } from '@mui/material';
import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { checkAncestors, getAncestorIds, getTreeIds } from '../../utils/tree-utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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


interface Props {
    menuIds: number[] | undefined
}

const MenuTreeView = forwardRef<number[], Props>(({ menuIds }, ref) => {

    const [selected, setSelected] = useState<number[]>([])

    useImperativeHandle(ref, () => {
        return selected
    })

    const menus = useSelector((state: RootState) => state.role.menus)

    useEffect(() => {
        if (menuIds) {
            setSelected(menuIds)
        }
    }, [menuIds])


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
                            checkAncestors(menu, selected, menus, ids)
                            return ids
                        })

                    }
                }

                return (
                    <CustomTreeItem key={menu.id} nodeId={menu.name} label={menu.name} ContentProps={{
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

    const defaultExpanded = useMemo(() => menus?.map(menu => menu.name) || [], [menus])

    return (
        <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            {
                menus &&
                <TreeView
                    aria-label="icon expansion"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ overflowX: 'hidden' }}
                    defaultExpanded={defaultExpanded}
                >
                    {
                        recursiveRenderTree(menus)
                    }
                </TreeView>
            }

        </Box>
    )
})

export default MenuTreeView