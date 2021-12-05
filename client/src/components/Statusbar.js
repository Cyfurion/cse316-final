import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

/**
    Our Status bar React component goes at the bottom of our UI.
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList) { text = store.currentList.name; }

    function handleCreateList() { store.createNewList(); }

    return (
        <div id="top5-statusbar">
            <IconButton 
                aria-label="add"
                onClick={handleCreateList}
            >
                <AddIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h4">Test</Typography>
        </div>
    );
}

export default Statusbar;
