import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { listInfo } = props;

    function handleOpenList(id) {
        store.setOpenedList(id);
    }
    function handleCloseList() {
        store.setOpenedList(null);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) { store.setIsListNameEditActive(); }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let cardElement =
        <ListItem
            id={listInfo._id}
            key={listInfo._id}
            sx={{ 
                "backgroundColor":"#fffff1",
                border:"2px solid black", 
                "border-radius":"10px", 
                "font-family":"Arial", 
                margin:"10px 0px",
                height:"100px"
            }}
            button
            onClick={() => { handleOpenList(listInfo._id) }}
        >
                <Box sx={{ padding: 0, flexGrow: 1 }}>
                    <b style={{ fontSize:"20pt" }}>{listInfo.name}</b><br />
                    By: {listInfo.ownerName}<br />
                    <u style={{color:"red", "fontWeight":"bold"}}>Edit</u>
                </Box>
                <Box>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, listInfo._id)
                    }} aria-label='delete'>
                        <DeleteIcon />
                    </IconButton>
                </Box>
        </ListItem>

    if (store.openedList && store.openedList._id === listInfo._id) {
        cardElement = 
            <ListItem
                id={listInfo._id}
                key={listInfo._id}
                sx={{ 
                    "backgroundColor":"#fffff1",
                    border:"2px solid black", 
                    "border-radius":"10px", 
                    "font-family":"Arial", 
                    margin:"10px 0px",
                    height:"400px"
                }}
                button
                onClick={() => { handleCloseList() }}
            >
                <Box sx={{ padding: "0", flexGrow: 1 }}>
                    <b style={{ fontSize:"20pt" }}>{listInfo.name}</b><br />
                    By: {listInfo.ownerName}<br />
                    <Stack sx={{
                        color:"#d4af37",
                        "backgroundColor":"#2c2f70",
                        "borderRadius":"10px",
                        "fontSize":"24pt",
                        "fontWeight":"bold",
                        width:"50%"
                    }}>
                        <ListItem>1. {listInfo.items[0]}</ListItem>
                        <ListItem>2. {listInfo.items[1]}</ListItem>
                        <ListItem>3. {listInfo.items[2]}</ListItem>
                        <ListItem>4. {listInfo.items[3]}</ListItem>
                        <ListItem>5. {listInfo.items[4]}</ListItem>
                    </Stack>
                    <u style={{color:"red", "fontWeight":"bold"}}>Edit</u>
                </Box>
                <Box>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, listInfo._id)
                    }} aria-label='delete'>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </ListItem>
    }

    // if (editActive) {
    //     cardElement =
    //         <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id={"list-" + listInfo._id}
    //             label="Top 5 List Name"
    //             name="name"
    //             autoComplete="Top 5 List Name"
    //             className='list-card'
    //             onKeyPress={handleKeyPress}
    //             onChange={handleUpdateText}
    //             defaultValue={listInfo.name}
    //             inputProps={{style: {fontSize: 48}}}
    //             InputLabelProps={{style: {fontSize: 24}}}
    //             autoFocus
    //         />
    // }
    return cardElement;
}

export default ListCard;
