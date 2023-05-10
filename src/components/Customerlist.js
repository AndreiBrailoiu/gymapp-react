import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';

export default function Customerlist() {
    // data received from given url
    const [customers, setCustomers] = useState([]);

    // table structure
    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 130 },
        { field: 'lastname', sortable: true, filter: true, width: 130 },
        { field: 'streetaddress', sortable: true, filter: true, width: 150 },
        { field: 'postcode', sortable: true, filter: true, width: 130 },
        { field: 'city', sortable: true, filter: true, width: 130 },
        { field: 'email', sortable: true, filter: true, width: 170 },
        { field: 'phone', sortable: true, filter: true, width: 130 },
        { cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining} />, width: 120 },
        { cellRenderer: params => <EditCustomer data={params.data} editCustomer={editCustomer} />, width: 120 },
        { cellRenderer: params => <Button startIcon={<DeleteOutlineIcon />} onClick={() => deleteCustomer(params.data)} color='error' size='small'></Button>, width: 120 }
    ]);

    const getCustomers = () => {
        // fetch customers for main table population
        fetch(API_URL + '/customers')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Fetch failed');
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getCustomers();
    }, []);
    // POST access to link provided and customer appended to body
    // basic error handling, in case of any failure print to console
    const addCustomer = (customer) => {
        fetch(API_URL + "/customers", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert('Add failed');
            })
            .catch(err => console.error(err));
    }
    // POST access to link provided and training appended to body
    const addTraining = (training) => {
        fetch(API_URL + "/trainings", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert('Add failed');
            })
            .catch(err => console.error(err));
    }
    // PUT connection providing customer data and url (self link)
    const editCustomer = (customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert('Edit failed');
            })
            .catch(err => console.error(err))
    }
    // DELETE customer by id (self link)
    const deleteCustomer = (data) => {
        if (window.confirm('Confirmation required')) {
            fetch(data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        getCustomers();
                    else
                        alert('Operation failed')
                })
        }
    }
    //const csvData = customers;
    const csvData = [
        ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"]
    ];
    for (let i = 0; i < customers.length; i++) {
        csvData.push([customers[i].firstname, customers[i].lastname, customers[i].streetaddress, customers[i].postcode, customers[i].city, customers[i].email, customers[i].phone]);
    }
    return (
        <>
            <div className="ag-theme-material" style={{ width: 'auto', height: 650, margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={11}
                />
                <AddCustomer addCustomer={addCustomer} />
                <Button startIcon={<DownloadIcon />}><CSVLink data={csvData} filename={"customers.csv"} enclosingCharacter={'    '}>Save CSV</CSVLink></Button>
            </div>
        </>
    )
}