import { useEffect, useState } from "react";
function SessionBreak({ time, showTime, title, onPause }) {

    const [timeCurrent, setTimeCurrent] = useState(time);


    useEffect(() => {
        let intervalo;
        if (onPause && timeCurrent > 0) { 
          intervalo = setInterval(() => {
            setTimeCurrent(timeCurrent - 1)
          }, 1000);
        }
        return () => {
          clearInterval(intervalo);
        };
      }, [timeCurrent, onPause]);

    return (
        <div>
            <h1>{title}</h1>
            <p className="fs-5 fw-bold">{showTime(timeCurrent)}</p>
        </div>
    );
}


export default SessionBreak;