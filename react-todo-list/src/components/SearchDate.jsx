import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MyApp(props) {
  const [value, onChange] = useState(new Date(props.dueDate));

  const handleDueDateChanged = (newDate) => {

    console.log(newDate.toLocaleDateString("en-us"));
    onChange(newDate);
    props.onDueDateChanged(newDate.toLocaleDateString("en-us"),props.id);
  }

  return (
    <div className="calenderContainer" id={"Calendar"+props.id}>
      <Calendar className="calender" onChange={handleDueDateChanged} value={value} />
    </div>
  );
}