import ListItem from '@mui/material/ListItem';

function CommentCard(props) {
    const {name, body} = props;

    return (
        <ListItem className="comment-card">
            <div>
                <u><b>{name}</b></u><br />
                {body}
            </div>
        </ListItem>
    );

}

export default CommentCard;
