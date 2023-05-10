import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddCustomer(props) {
    // customer structure
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    // visibility const
    const [open, setOpen] = React.useState(false);
    // visible
    const handleClickOpen = () => {
        setOpen(true);
    };
    // invisible
    const handleClose = () => {
        setOpen(false);
    };
    // save and make popup invisible
    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    return (
        <div>
            <Button startIcon={<AddCircleIcon />} color='success' onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Firstname"
                        fullWidth
                        variant="standard"
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        fullWidth
                        variant="standard"
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="standard"
                        value={customer.postcode}
                        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                        value={customer.city}
                        onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}