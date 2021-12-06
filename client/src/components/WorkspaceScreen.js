import { useContext, useEffect } from 'react';
import Top5Item from './Top5Item.js';
import { GlobalStoreContext } from '../store/index.js';
/**
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let newName = store.currentList.name;
    let newItems = [...store.currentList.items];

    function update(index, value) { newItems[index] = value; }
    function handleNameUpdate(event) { newName = event.target.value; }

    function handleSave() {
        let id = store.currentList._id;
        store.changeListName(id, newName);
        store.changeListItems(id, newItems);
        store.closeCurrentList();
    }
    function handlePublish() {
        store.publishCurrentList();
        store.closeCurrentList();
    }

    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                <input type="text"
                    id="name-bar" 
                    defaultValue={store.currentList.name} 
                    onInput={handleNameUpdate}
                />
                <div id="list-space">
                    <div className="item-number" style={{ gridArea:"1 / 1 / 2 / 2" }}>1.</div>
                    <div className="item-number" style={{ gridArea:"2 / 1 / 3 / 2" }}>2.</div>
                    <div className="item-number" style={{ gridArea:"3 / 1 / 4 / 2" }}>3.</div>
                    <div className="item-number" style={{ gridArea:"4 / 1 / 5 / 2" }}>4.</div>
                    <div className="item-number" style={{ gridArea:"5 / 1 / 6 / 2" }}>5.</div>
                    <Top5Item 
                        text={store.currentList.items[0]} 
                        updateCallback={update}
                        index={0} 
                        style={{ gridArea:"1 / 2 / 2 / 3" }}
                    />
                    <Top5Item 
                        text={store.currentList.items[1]} 
                        updateCallback={update}
                        index={1} 
                        style={{ gridArea:"2 / 2 / 3 / 3" }}
                    />
                    <Top5Item 
                        text={store.currentList.items[2]} 
                        updateCallback={update}
                        index={2} 
                        style={{ gridArea:"3 / 2 / 4 / 3" }}
                    />
                    <Top5Item 
                        text={store.currentList.items[3]} 
                        updateCallback={update}
                        index={3} 
                        style={{ gridArea:"4 / 2 / 5 / 3" }}
                    />
                    <Top5Item 
                        text={store.currentList.items[4]} 
                        updateCallback={update}
                        index={4} 
                        style={{ gridArea:"5 / 2 / 6 / 3" }}
                    />
                </div>
                <button className="workspace-button" onClick={handlePublish}>Publish</button>
                <button className="workspace-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default WorkspaceScreen;
