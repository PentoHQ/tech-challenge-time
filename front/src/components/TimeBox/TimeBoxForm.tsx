import { Dispatch, SetStateAction, useState, useEffect } from "react";
import * as React from "react";
import * as moment from "moment";
import cssExports from "../../assets/style.module.scss";
export interface TimeBoxFormProps {
  start: any;
  end: boolean;
  name: string;
  errors: string;
  setName: Dispatch<SetStateAction<string>>;
  setStart: Dispatch<SetStateAction<any>>;
  setEnd: Dispatch<SetStateAction<boolean>>;
}

export const TimeBoxForm: React.FC<TimeBoxFormProps> = (props) => {
  const { setStart, setEnd, setName, start, end, name, errors } = props;

  const [time, setTime] = useState(moment(new Date().getTime()));

  useEffect(() => {
    setInterval(() => {
      setTime(moment(new Date().getTime()));
    }, 1000);
  }, [start]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setName(e.currentTarget.value);
  };
  return (
    <div className={cssExports.create}>
      <input
        type={"text"}
        onChange={onChange}
        placeholder={"Enter a name for your Time Box"}
        value={name}
      />
      <div>
        <button
          disabled={name && !start ? false : true}
          onClick={() => setStart(new Date().getTime())}
        >
          Start
        </button>
      </div>
      {start && !end && !errors && (
        <div>
          {moment(start).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          <div>{moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
        </div>
      )}
      {errors && <h6 className={cssExports.errors}>{errors}</h6>}
      <div>
        <button onClick={() => setEnd(true)}>End</button>
        {end && (
          <div>
            <div className={cssExports.timeBox}>
              {moment(start).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div>
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
