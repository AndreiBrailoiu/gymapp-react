import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import Customerlist from './components/Customerlist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Traininglist from './components/Traininglist';
import React, { useState } from "react";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrChart from './components/TrChart';

function App() {

  const [value, setValue] = useState('customers');
  const handleChange = (event, value) => { setValue(value); };

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Plan it now!
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="customers" icon={<PersonIcon />} />
          <Tab value="trainings" icon={<FitnessCenterIcon />} />
          <Tab value="calendar" icon={<CalendarMonthIcon />} />
        </Tabs>
        {value === 'customers' && <Customerlist />}
        {value === 'trainings' && <Traininglist />}
        {value === 'calendar' && <TrChart />}
      </div>
    </div >
  );
}

export default App;
