import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='coverer'>
        <div className='calenderContainer'>
            <Calendar
                    className='calender'
                    onChange={onChange}
                    value={value}
                />
        </div>
      
    </div>
  );
}