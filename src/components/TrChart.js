import React, { useEffect, useState, useCallback } from "react";
import { Chart } from "react-google-charts";
import { API_HR } from "../constants";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrChart() {
    const [trainings, setTrainings] = useState([]);
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

    const data = [["Training", "Minutes"]];
    const temp = [];
    const calTemp = [];
    const customers = [];
    const mp = [];
    // getting training names and relative duration
    for (let i = 0; i < trainings.length; i++) {
        temp.push([trainings[i].activity, trainings[i].duration]);
        calTemp.push([trainings[i].date, trainings[i].activity, trainings[i].duration]);
        customers.push(trainings[i].customer.firstname + ' ' + trainings[i].customer.lastname);
    }
    // map creation to remove duplicate trainings
    temp.forEach(entry => {
        const [key, value] = entry;
        mp[key] ??= { value: [] }
        mp[key].value.push(value)
    })
    // for each element (entry) calculating an average value
    // (parsed then to int to remove decimal part)
    Object.entries(mp).forEach(entry => {
        const [key, obj] = entry;
        const average = parseInt(obj.value.reduce((a, b) => a + b, 0) / obj.value.length);
        // printing the result per key to ensure data is correct
        //console.log(key, obj.value, "Average is:", average)
        // populating the returning array in format key : average
        data.push([key, average]);
    });
    // chart labelling and other config settings
    const options = {
        title: "Trainings Summary",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Average Training Time",
            minValue: 0,
        },
        vAxis: {
            title: "Training",
        },
    };
    // calendar localization set to moment (in use)
    const localizer = momentLocalizer(moment);
    // contains events added to calendar
    const myEventsList = [];
    // events population: starting date, ending date (start + duration),
    // and customer name and lastname
    for (let i = 0; i < calTemp.length; i++) {
        myEventsList.push({
            start: new Date(calTemp[i][0]),
            end: new Date(calTemp[i][0]).setMinutes(new Date(calTemp[i][0]).getMinutes() + calTemp[i][2]),
            title: calTemp[i][1] + ' - ' + customers[i]
        });
    }
    // on tile click alert on screen information to help in crowded calendar situations
    const handleSelectEvent = useCallback(
        (event) => window.alert(new Date(event.start).getHours() + ':' + new Date(event.start).getMinutes() +
            ' - ' + new Date(event.end).getHours() + ':' + new Date(event.end).getMinutes() + '\n' + event.title),
        []
    )
    // calendar definition
    const MyCalendar = props => (
        <div>
            <Calendar
                localizer={localizer} // set to moment localizer
                events={myEventsList} // data to populate calendar
                startAccessor="start"
                endAccessor="end"
                style={{ height: 900 }}
                defaultView="week" // starting view
                onSelectEvent={handleSelectEvent} // on tile click event
                dayLayoutAlgorithm={'overlap'} // tiles can overlap
                step={30} // display slots of 30 mins
                timeslots={1} // display hours 1 by 1
                selectable
            />
        </div>
    )
    return (
        <>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            /><hr />
            <MyCalendar />
        </>
    )

}