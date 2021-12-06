import { useContext } from 'react';
import { GlobalStoreContext } from '../store/index.js';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';

function Toolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleChangeView(view) { store.setView(view); }

    return (
        <div id="list-selector-heading">
            <Box sx={{ flexGrow: 1 }}>
                <IconButton 
                    aria-label="home" 
                    onClick={() => handleChangeView("home")}
                    disabled={store.currentList ? true : false}
                >
                    <HomeIcon />
                </IconButton>
                <IconButton 
                    aria-label="all" 
                    onClick={() => handleChangeView("all")}
                    disabled={store.currentList ? true : false}
                >
                    <GroupIcon />
                </IconButton>
                <IconButton 
                    aria-label="user" 
                    onClick={() => handleChangeView("user")}
                    disabled={store.currentList ? true : false}
                >
                    <PersonIcon />
                </IconButton>
                <IconButton 
                    aria-label="community" 
                    onClick={() => handleChangeView("community")}
                    disabled={store.currentList ? true : false}
                >
                    <FunctionsIcon />
                </IconButton>
                <input type="text" id="search-bar" disabled={store.currentList ? true : false} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    aria-label="sort by"
                    aria-haspopup="true"
                    sx={{ color: 'black' }}
                    disabled={store.currentList ? true : false}
                >
                    <p id="sort-by-text">SORT BY</p>
                    <SortIcon />
                </IconButton>
            </Box>
        </div>
    )
}

export default Toolbar;
