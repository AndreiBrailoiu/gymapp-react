import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

export default function EditCustomer(props) {
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
    // visible & populate fields with customer data
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        })
    };
    // invisible
    const handleClose = () => {
        setOpen(false);
    };
    // edit providing the customer and self pointing link (accessing id)
    const handleSave = () => {
        props.editCustomer(customer, props.data.links[0].href);
        setOpen(false);
    }

    return (
        <div>
            <Button size='small' startIcon={<EditIcon />} color='secondary' onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit and Save</DialogTitle>
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