import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { API_HR, API_URL } from "../constants";
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    // table structure
    const [columnDefs] = useState([
        // formatting the date field to Www, dd Mmm yyyy hh:mm:ss GMT within the valueFormatter 
        { field: 'date', sortable: true, filter: true, width: 250, valueFormatter: params => params && new Date(params.data.date).toUTCString() },
        { field: 'duration', sortable: true, filter: true, width: 130 },
        { field: 'activity', sortable: true, filter: true, width: 170 },
        // customer field is the combined result of firstname and lastname
        { field: 'customer', sortable: true, filter: true, width: 130, valueGetter: (params) => params.data.customer.firstname + ' ' + params.data.customer.lastname },
        { cellRenderer: params => <Button startIcon={<DeleteOutlineIcon />} onClick={() => deleteTraining(params.data)} color='error' size='small'></Button>, width: 120 }
    ]);

    const getTrainings = () => {
        // fetch trainings for secondary table population
        fetch(API_HR + '/gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Fetch failed');
            })
            // in case of success save the new state
            .then(data => setTrainings(data))
            // console output for debug
            .catch(err => console.error(err))
    }
    // table population
    useEffect(() => {
        getTrainings();
    }, []);
    // DELETE training by id (built from url + own id)
    const deleteTraining = (data) => {
        if (window.confirm('Confirmation required')) {
            fetch(API_URL + '/trainings/' + data.id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        getTrainings();
                    else
                        alert('Operation failed')
                })
        }
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: 'auto', height: 700, margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={11}
                />
            </div>
        </>
    )
}