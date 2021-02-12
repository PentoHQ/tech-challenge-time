import * as React from "react";
import DatePicker from "react-datepicker";
import Auth from "../../lib/Auth";
import axios from "axios";
import { useState, useEffect } from "react";
import * as moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

export const TimeBoxIndex: React.FC = () => {
  const [timeBoxes, setTimeBoxes] = useState([]);
  const [reset, setReset] = useState(false);

  const [filteredTimeBoxes, setFilteredTimeBoxes] = useState([]);

  const [timePeriod, setTimePeriod] = useState();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setTimePeriod(undefined);
  }, [reset]);

  useEffect(() => {
    axios
      .get("/api/time-boxes", {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      })
      .then((res) => {
        console.log(res);
        setTimeBoxes(res.data);
      })
      .catch((e) => {
        //Todo ERROR HANDLING
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setFilteredTimeBoxes(undefined);
  }, [reset]);

  const timeFilter = () => {
    let timeBoxesFiltered = [...timeBoxes];
    timeBoxesFiltered = timeBoxesFiltered.filter((timeBox) => {
      return (
        moment(timeBox.updated_at).startOf(timePeriod).format() ==
        moment(selectedDate).startOf(timePeriod).format()
      );
    });
    setFilteredTimeBoxes(timeBoxesFiltered);
  };

  return (
    <div>
      <h3>Filter By..</h3>
      <div>
        <button onClick={() => setTimePeriod("day")}>Day</button>
        <button onClick={() => setTimePeriod("week")}>Week</button>
        <button onClick={() => setTimePeriod("month")}>Month</button>
        <button onClick={() => setReset(true)}>Show All</button>

        {timePeriod && (
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={selectedDate}
            onChange={() => timeFilter()}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          width: "600px",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {timeBoxes &&
          !filteredTimeBoxes &&
          timeBoxes.map((timeBox) => (
            <div
              key={timeBox.name}
              style={{
                height: "150px",
                width: "150px",
                border: "2px solid black",
                display: "flex",
              }}
            >
              {timeBox.name}
              {timeBox.created_at}
              {timeBox.updated_at ? timeBox.updated_at : "Still Active"}
            </div>
          ))}
        {filteredTimeBoxes &&
          timeBoxes.map((timeBox) => (
            <div
              key={timeBox.name}
              style={{
                height: "150px",
                width: "150px",
                border: "2px solid black",
                display: "flex",
              }}
            >
              {timeBox.created_at}
            </div>
          ))}
      </div>
    </div>
  );
};
