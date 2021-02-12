import { Dispatch, SetStateAction } from "react";
import * as React from "react";
import * as moment from "moment";
import * as Clock from "react-live-clock";

export interface TimeBoxFormProps {
  start: any;
  end: boolean;
  setStart: Dispatch<SetStateAction<any>>;
  setEnd: Dispatch<SetStateAction<boolean>>;
}

export const TimeBoxForm: React.FC<TimeBoxFormProps> = (props) => {
  const { setStart, setEnd, start, end } = props;

  return (
    <div>
      <div style={{ height: "100px" }}>
        <button onClick={() => setStart(new Date().getTime())}>Start</button>
      </div>
      {start && !end && (
        <div style={{ marginTop: "15px" }}>
          {moment(start).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          <div style={{ marginTop: "15px" }}>
            <Clock format={"HH:mm:ss"} ticking={true} timezone={"GB"} />
          </div>
        </div>
      )}
      <div style={{ height: "100px" }}>
        <button onClick={() => setEnd(true)}>End</button>
        {end && (
          <div>
            <div style={{ marginTop: "15px" }}>
              {moment(start).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div style={{ marginTop: "15px" }}>
              {moment(new Date().getTime()).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
