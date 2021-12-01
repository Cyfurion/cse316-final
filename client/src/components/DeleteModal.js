import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        store.unmarkListForDeletion();
        setOpen(false);
    };
    const handleDelete = () => {
        store.deleteMarkedList();
        setOpen(false);
    }
    const listName = store.listMarkedForDeletion.name;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm Delete List"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the Top 5 {listName} List?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}
