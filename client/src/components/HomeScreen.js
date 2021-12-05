import React, { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth'
import DeleteModal from './DeleteModal.js';
import ListCard from './ListCard.js';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import List from '@mui/material/List';
/**
    This React component lists all the top5 lists in the UI.
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadListData({ ownerEmail: auth.user.email });
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '96%', left: '3%' }}>
            {
                store.listData.map((list) => (   
                    <ListCard
                        key={list._id}
                        listInfo={list}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    let deleteModal = "";
    if (store.listMarkedForDeletion) {
        deleteModal = <DeleteModal />;
    }
    return (
        <div id="top5-list-selector">
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
            <div id="list-selector-list">
                {listCard}
            </div>
            {deleteModal}
        </div>)
}

export default HomeScreen;
