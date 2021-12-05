import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

/**
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { listInfo } = props;

    function handleOpenList(id) {
        store.setOpenedList(id);
    }
    function handleCloseList() {
        store.setOpenedList(null);
    }

    function handleLoadList(event, id) {
        event.stopPropagation();
        store.setCurrentList(id);
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
            disableRipple={true}
        >
                <Box sx={{ padding: 0, flexGrow: 1 }}>
                    <b style={{ fontSize:"20pt" }}>{listInfo.name}</b><br />
                    By: {listInfo.ownerName}<br />
                    <u style={{color:"red", "fontWeight":"bold"}} onClick={(event) => handleLoadList(event, listInfo._id)}>Edit</u>
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
                disableRipple={true}
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

    return cardElement;
}

export default ListCard;
