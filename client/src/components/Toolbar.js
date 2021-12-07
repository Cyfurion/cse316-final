import { useState, useContext } from 'react';
import { GlobalStoreContext } from '../store/index.js';
import AuthContext from '../auth';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';

function Toolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function handleChangeView(view) { store.setView(view); }
    function handleSort(type) { store.sortBy(type); }
    function handleSearch(event) {
        if (event.code === "Enter") {
            if (event.target.value === "") { 
                store.loadListData();
            } else {
                let filter = {};
                switch (store.view) {
                    case "home":
                        filter = { name: { $regex: '^' + event.target.value, $options: 'i' }, ownerEmail: auth.user.email }
                        break;
                    case "all":
                        filter = { 
                            name: { $regex: '^' + event.target.value + '$', $options: 'i' }, 
                            ownerName : { $ne: "Community List" },
                            published: true 
                        }
                        break;
                    case "user":
                        filter = { 
                            ownerName: { $regex: '^' + event.target.value + '$', $options: 'i', $ne: "Community List" }, 
                            published: true 
                        }
                        break;
                    case "community":
                        filter = { name: { $regex: '^' + event.target.value + '$', $options: 'i' }, ownerName: "Community List" }
                        break;
                    default:
                        return;
                }
                store.loadListData(filter);
            }
        }
    }

    const handleMenuOpen = (event) => { setAnchorEl(event.currentTarget); }
    const handleMenuClose = () => { setAnchorEl(null); }

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
                <input 
                    type="text" 
                    id="search-bar" 
                    disabled={store.currentList ? true : false} 
                    onKeyPress={handleSearch}
                />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    aria-label="sort by"
                    aria-haspopup="true"
                    sx={{ color: 'black' }}
                    disabled={store.currentList ? true : false}
                    onClick={handleMenuOpen}
                >
                    <p id="sort-by-text">SORT BY</p>
                    <SortIcon />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="sort-menu"
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleSort("new")}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={() => handleSort("old")}>Publish Date (Oldest)</MenuItem>
                <MenuItem onClick={() => handleSort("views")}>Views</MenuItem>
                <MenuItem onClick={() => handleSort("likes")}>Likes</MenuItem>
                <MenuItem onClick={() => handleSort("dislikes")}>Dislikes</MenuItem>
            </Menu>
        </div>
    )
}

export default Toolbar;
