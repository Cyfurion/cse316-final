import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

/**
    Our Status bar React component goes at the bottom of our UI.
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleCreateList() { store.createNewList(); }

    switch (store.view) {
        case "home":
            return (
                <div id="top5-statusbar">
                    <IconButton 
                        aria-label="add"
                        onClick={handleCreateList}
                        disabled={store.currentList ? true : false}
                    >
                        <AddIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="h4">Your Lists</Typography>
                </div>
            );
        case "all":
            return (
                <div id="top5-statusbar">
                    <Typography variant="h4">All Lists</Typography>
                </div>
            );
        case "user":
            return (
                <div id="top5-statusbar">
                    <Typography variant="h4">User Lists</Typography>
                </div>
            );
        case "community":
            return (
                <div id="top5-statusbar">
                    <Typography variant="h4">Community Lists</Typography>
                </div>
            );
        default:
            return;
    }
}

export default Statusbar;
