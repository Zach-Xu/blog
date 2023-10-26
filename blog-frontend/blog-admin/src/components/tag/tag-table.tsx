import { Box, Button, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import Scrollbar from 'simplebar-react';
import CustomPagination from '../common/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface Props {
    tags: Tag[],
};

export const TagsTable = ({ tags }: Props) => {

    return (
        <Box
            component='main'
        >
            <Stack
                spacing={5}
                sx={{
                    px: 2
                }}
            >
                <Scrollbar>
                    <Box sx={{
                        minWidth: 800,
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        id
                                    </TableCell>
                                    <TableCell>
                                        Tag name
                                    </TableCell>
                                    <TableCell>
                                        description
                                    </TableCell>
                                    <TableCell>
                                        Operations
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tags.map((tag) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={tag.id}
                                        >
                                            <TableCell>
                                                {tag.id}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {tag.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {tag.description}
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    spacing={2}
                                                    direction='row'
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={(
                                                            <SvgIcon fontSize="small">
                                                                <PencilSquareIcon />
                                                            </SvgIcon>
                                                        )}
                                                        sx={{
                                                            bgcolor: 'white',
                                                            '&:hover': {
                                                                bgcolor: 'white'
                                                            }
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<DeleteIcon />}
                                                        color='error'
                                                        sx={{
                                                            bgcolor: 'white',
                                                            '&:hover': {
                                                                bgcolor: 'white'
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </Scrollbar>
                <CustomPagination total={20} pageSize={5} />
            </Stack>
        </Box >
    );
};

