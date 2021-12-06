import React, { useContext, useEffect } from 'react';
import GlobalStoreContext from '../store';
import DeleteModal from './DeleteModal.js';
import ListCard from './ListCard.js';
import Toolbar from './Toolbar.js';
import List from '@mui/material/List';
/**
    This React component lists all the top5 lists in the UI.
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadListData();
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
            <Toolbar />
            <div id="list-selector-list">{listCard}</div>
            {deleteModal}
        </div>)
}

export default HomeScreen;
