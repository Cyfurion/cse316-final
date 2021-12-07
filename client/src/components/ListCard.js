import { useContext } from 'react'
import AuthContext from '../auth'
import GlobalStoreContext from '../store'
import CommentCard from './CommentCard'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

/**
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { listInfo } = props;

    function handleOpenList(id) {
        store.setOpenedList(id);
    }
    function handleCloseList() { store.setOpenedList(null); }

    function handleLoadList(event, id) {
        event.stopPropagation();
        store.setCurrentList(id);
    }

    function handleComment(event) {
        if (event.code === "Enter") {
            store.comment(auth.user.email, event.target.value);
            event.target.value = "";
        }
    }
    function handleRate(event, type) { 
        event.stopPropagation();
        store.rate(listInfo._id, type); 
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let text = "", likes = "", dislikes = "", views = "", comment = "";
    if (listInfo.published) {
        text = <b>Published: <span style={{ color: "green" }}>{listInfo.publishedDate}</span></b>
        likes = listInfo.likes.includes(auth.user.email) ? 
            <IconButton 
                aria-label='like' 
                sx={{ 
                    gridArea: "1 / 1 / 2 / 2", 
                    justifyContent: "left",
                    padding: 0
                }}
                onClick={(event) => handleRate(event, "like")}
            >
                <ThumbUpIcon /><b style={{ marginLeft: "10px" }}>{listInfo.likes.length}</b>
            </IconButton>
            :
            <IconButton 
                aria-label='like' 
                sx={{ 
                    gridArea: "1 / 1 / 2 / 2", 
                    justifyContent: "left",
                    padding: 0
                }}
                onClick={(event) => handleRate(event, "like")}
            >
                <ThumbUpOutlinedIcon /><b style={{ marginLeft: "10px" }}>{listInfo.likes.length}</b>
            </IconButton>
        dislikes = listInfo.dislikes.includes(auth.user.email) ? 
            <IconButton 
                aria-label='dislike' 
                sx={{ 
                    gridArea: "1 / 2 / 2 / 3", 
                    justifyContent: "left", 
                    padding: 0
                }}
                onClick={(event) => handleRate(event, "dislike")}
            >
                <ThumbDownIcon /><b style={{ marginLeft: "10px" }}>{listInfo.dislikes.length}</b>
            </IconButton>
            :
            <IconButton 
                aria-label='dislike' 
                sx={{ 
                    gridArea: "1 / 2 / 2 / 3", 
                    justifyContent: "left", 
                    padding: 0
                }}
                onClick={(event) => handleRate(event, "dislike")}
            >
                <ThumbDownOutlinedIcon /><b style={{ marginLeft: "10px" }}>{listInfo.dislikes.length}</b>
            </IconButton>
        views = <b style={{ gridArea: "2 / 1 / 3 / 3" }}>Views: <span style={{ color: "darkred" }}>{listInfo.views}</span></b>;
        comment = 
        <input 
            style={{ 
                width: "98.5%", 
                height: "10%", 
                marginTop: "2.5%",
                borderRadius: "8px"
            }} 
            type="text" 
            placeholder="Add Comment"
            onClick={(event) => event.stopPropagation()}
            onKeyPress={handleComment}
        />
    } else {
        text = <u style={{ color: "red", fontWeight: "bold" }} onClick={(event) => handleLoadList(event, listInfo._id)}>Edit</u>
    }

    let cardElement =
        <ListItem
            id={listInfo._id}
            key={listInfo._id}
            sx={{ 
                backgroundColor: listInfo.published ? "#d4d4f5" : "#fffff1",
                border: "2px solid black", 
                borderRadius: "10px", 
                fontFamily: "Arial", 
                margin: "10px 0px",
                height: "100px",
                '&:hover': {
                    backgroundColor: listInfo.published ? "#d4d4f5" : "#fffff1"
                }
            }}
            button
            onClick={() => { handleOpenList(listInfo._id) }}
            disableRipple={true}
        >
                <Box sx={{ padding: 0, flexGrow: 1 }}>
                    <b style={{ fontSize: "20pt" }}>{listInfo.name}</b><br />
                    By: {listInfo.ownerName}<br />
                    {text}
                </Box>
                <Box 
                    sx={{ 
                        width: "30%", 
                        display: "grid",
                        "grid-template-columns": "repeat(2, 2fr) 1fr",
                        "grid-template-rows": "3fr 1fr",
                        "grid-column-gap": "0px",
                        "grid-row-gap": "0px",
                    }}
                >
                    {likes}
                    {dislikes}
                    <IconButton 
                        onClick={(event) => { handleDeleteList(event, listInfo._id) }} 
                        aria-label= 'delete'
                        sx={{ gridArea: "1 / 3 / 2 / 4" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    {views}
                    <ExpandMoreIcon sx={{ gridArea: "2 / 3 / 3 / 4" }} />
                </Box>
        </ListItem>

    if (store.openedList && store.openedList._id === listInfo._id) {
        cardElement = 
            <ListItem
                id={listInfo._id}
                key={listInfo._id}
                sx={{ 
                    backgroundColor: listInfo.published ? "#d4d4f5" : "#fffff1",
                    border: "2px solid black", 
                    borderRadius: "10px", 
                    fontFamily: "Arial", 
                    margin: "10px 0px",
                    '&:hover': {
                        backgroundColor: listInfo.published ? "#d4d4f5" : "#fffff1"
                    }
                }}
                button
                onClick={handleCloseList}
                disableRipple={true}
            >
                <Box sx={{
                    display: "grid",
                    "grid-template-columns": "2fr 0.8fr 0.48fr .48fr .24fr",
                    "grid-template-rows": "1.5fr 7fr 1fr",
                    "grid-column-gap": "0px",
                    "grid-row-gap": "0px",
                    width: "100%"
                }}>
                    <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
                        <b style={{ fontSize: "20pt" }}>{listInfo.name}</b><br />
                        By: {listInfo.ownerName}
                    </div>
                    <Stack sx={{
                        color: "#d4af37",
                        backgroundColor: "#2c2f70",
                        width: "97%",
                        gridArea: "2 / 1 / 3 / 2",
                        borderRadius: "10px",
                        fontSize: "24pt",
                        fontWeight: "bold"
                    }}>
                        <ListItem>1. {listInfo.items[0]}</ListItem>
                        <ListItem>2. {listInfo.items[1]}</ListItem>
                        <ListItem>3. {listInfo.items[2]}</ListItem>
                        <ListItem>4. {listInfo.items[3]}</ListItem>
                        <ListItem>5. {listInfo.items[4]}</ListItem>
                    </Stack>
                    <div style={{ 
                        display: "flex",
                        alignItems: "center",
                        gridArea: "3 / 1 / 4 / 2"
                    }}>
                        {text}
                    </div>
                    <div style={{ 
                        display: "flex",
                        alignItems: "center",
                        gridArea: "1 / 3 / 2 / 4"
                    }}>
                        {likes}
                    </div>
                    <div style={{ 
                        display: "flex",
                        alignItems: "center",
                        gridArea: "1 / 4 / 2 / 5"
                    }}>
                        {dislikes}
                    </div>
                    <IconButton 
                        onClick={(event) => { handleDeleteList(event, listInfo._id) }} 
                        aria-label= 'delete'
                        sx={{ gridArea: "1 / 5 / 2 / 6" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Box sx={{ gridArea: "2 / 2 / 3 / 6" }}>
                        <Stack sx={{
                            height: "210px",
                            overflowY: "scroll"
                        }}>
                            {
                                listInfo.comments.map((comment) => (
                                    <CommentCard name={comment.name} body={comment.body} />
                                ))
                            }
                        </Stack>
                        {comment}
                    </Box>
                    <div style={{ 
                        display: "flex",
                        alignItems: "center",
                        gridArea: "3 / 3 / 4 / 4" 
                    }}>
                        {views}
                    </div>
                    <ExpandLessIcon sx={{ gridArea: "3 / 5 / 4 / 6" }} />
                </Box>
            </ListItem>
    }

    return cardElement;
}

export default ListCard;
