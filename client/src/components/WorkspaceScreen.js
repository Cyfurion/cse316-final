import { useContext } from 'react';
import Top5Item from './Top5Item.js';
import Toolbar from './Toolbar.js';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js';
/**
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let editItems = 
        <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                store.currentList.items.map((item, index) => (
                    <Top5Item 
                        key={'top5-item-' + (index + 1)}
                        text={item}
                        index={index} 
                    />
                ))
            }
        </List>;
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                <input type="text" id="name-bar" value={store.currentList.name}/>
                <div id="list-space">
                {/* <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                {editItems} */}
                </div>
            </div>
        </div>
    )
}

export default WorkspaceScreen;
