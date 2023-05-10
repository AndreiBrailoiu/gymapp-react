import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTraining(props) {
    // training structure & setting today's date as default
    const [training, setTraining] = React.useState({
        date: new Date().toISOString(),
        duration: '',
        activity: '',
        customer: ''
    })

    // visibility const
    const [open, setOpen] = React.useState(false);
    // visible & linking training to customer
    const handleClickOpen = () => {
        setOpen(true);
        setTraining({ ...training, customer: props.data.links[0].href })
    };
    // invisible
    const handleClose = () => {
        setOpen(false);
    };
    // save and make popup invisible
    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    return (
        <div>
            <Button startIcon={<AddIcon />} color='success' onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            margin="dense"
                            label="Date"
                            fullWidth
                            value={training.date}
                            // event handled differently in date pickers
                            onChange={e => setTraining({ ...training, date: e.toISOString() })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
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