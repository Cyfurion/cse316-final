import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';

function Toolbar() {
    return (
        <div id="list-selector-heading">
            <IconButton aria-label="home">
                <HomeIcon />
            </IconButton>
            <IconButton aria-label="all">
                <GroupIcon />
            </IconButton>
            <IconButton aria-label="user">
                <PersonIcon />
            </IconButton>
            <IconButton aria-label="community">
                <FunctionsIcon />
            </IconButton>
            <input type="text" id="search-bar" />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    aria-label="sort by"
                    aria-haspopup="true"
                    sx={{ color: 'black' }}
                >
                    <p id="sort-by-text">SORT BY</p>
                    <SortIcon />
                </IconButton>
            </Box>
        </div>
    )
}

export default Toolbar;
