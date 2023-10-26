import Box from '@mui/material/Box'
import DashboardLayout from '../../../layouts/dashboard/layout'
import { Container, Stack } from '@mui/material'
import Search from '../../../components/common/search'
import { TagsTable } from '../../../components/tag/tag-table'
import { tags } from '../../../data/tag'


const TagList = () => {

    const items = tags.data

    return (
        <DashboardLayout>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 2
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Search name='Tag name' placeholder='please input tag name' />
                        <TagsTable
                            tags={items.rows}
                        />
                    </Stack>
                </Container>
            </Box>
        </DashboardLayout>
    )
}

export default TagList