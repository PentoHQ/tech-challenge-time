import * as React from "react";
import DatePicker from "react-datepicker";
import Auth from "../../lib/Auth";
import axios from "axios";
import { useState, useEffect } from "react";
import * as moment from "moment";
import useDidMount from "../CustomHooks/DidMount";
import cssExports from "../../assets/style.module.scss";

export const TimeBoxIndex: React.FC = () => {
  const [timeBoxes, setTimeBoxes] = useState([]);
  const [reset, setReset] = useState(false);
  const [filteredTimeBoxes, setFilteredTimeBoxes] = useState<any>();
  const [filtered, setFiltered] = useState(false);
  const [timePeriod, setTimePeriod] = useState<any>();
  const [event, setId] = useState(undefined);

  const [selectedDate, setSelectedDate] = useState<any>();

  useDidMount(() => {
    setTimePeriod(undefined);
    setFilteredTimeBoxes(timeBoxes);
  }, [reset]);

  useEffect(() => {
    axios
      .get("/api/time-boxes", {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      })
      .then((res) => {
        setTimeBoxes(res.data);
        setFilteredTimeBoxes(res.data);
      })
      .catch((e) => {
        //Todo ERROR HANDLING
        console.log(e);
      });
  }, []);

  useDidMount(() => {
    setFiltered(false);
  }, [reset]);

  useEffect(() => {
    if (event) {
      const id = event.target.id;
      axios
        .post(
          `/api/time-box/${id}`,
          {},
          { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
        )
        .then((res) => {
          console.log(res.data);
          let updated = [...filteredTimeBoxes];
          updated = updated.map((timeBox) =>
            timeBox.id == id ? res.data : timeBox
          );
          setFilteredTimeBoxes(updated);
        })
        .catch((e) => {
          //Todo ERROR HANDLING
          console.log(e);
        });
    }
  }, [event]);

  useEffect(() => {
    timeFilter();
  }, [selectedDate, timePeriod]);

  const timeFilter = () => {
    let timeBoxesFiltered = [...timeBoxes];
    if (timePeriod && selectedDate) {
      timeBoxesFiltered = timeBoxesFiltered.filter((timeBox) => {
        return (
          moment(timeBox.created_at).startOf(timePeriod).format() ===
          moment(selectedDate).startOf(timePeriod).format()
        );
      });
      setFiltered(!filtered);
    }
    setFilteredTimeBoxes(timeBoxesFiltered);
  };
  return (
    <div>
      <div>
        <h3>Filter By..</h3>
        <div className={cssExports.timePeriods}>
          <button onClick={() => setTimePeriod("day")}>Day</button>
          <button onClick={() => setTimePeriod("week")}>Week</button>
          <button onClick={() => setTimePeriod("month")}>Month</button>
          <button onClick={() => setReset(!reset)}>Show All</button>
        </div>
        {timePeriod && selectedDate && (
          <div>
            <h3>
              You have chosen to filter from the beginning of the {timePeriod}{" "}
              of {moment(selectedDate).format("DD/MM/yyyy").toString()}
            </h3>
          </div>
        )}
        {timePeriod && (
          <div className={cssExports.datePicker}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              placeholderText={"Select Date"}
              onChange={(value) => setSelectedDate(value)}
            />
          </div>
        )}
      </div>
      <div className={cssExports.container}>
        {filteredTimeBoxes &&
          filteredTimeBoxes.map((timeBox: any) => (
            <div key={timeBox.id} className={cssExports.timeBox}>
              {" "}
              <h3 style={{paddingTop:'5px'}}>{timeBox.name}</h3>
              {<p style={{margin:'0'}} >Started at: {timeBox.created_at} </p>}
              {!timeBox.active ? (
                <p>Ended: {timeBox.updated_at}</p>
              ) : (
                <p id={timeBox.id}>
                  <button
                    style={{marginTop:'0'}}
                    id={timeBox.id.toString()}
                    onClick={(event) => setId(event)}
                  >
                    End Time Box
                  </button>
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
