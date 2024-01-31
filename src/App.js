import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';
import  SessionBreak  from './components/SessionBreak';
import  HandlerLength  from './components/HandlerLength';


function App() {

  const [toggleBoolean, setToggleBoolean] = useState(false);
  const [time, setTime] = useState(1500);
  const [minutes, setMinutes] = useState(time/60);
  const [seconds, setSeconds] = useState(time%60);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let intervalo;
    if (toggleBoolean && time > 0) { 
      intervalo = setInterval(() => {
        setMinutes(Math.floor(time/60));
        setSeconds(Math.floor(time%60));
        setTime(time => time - 1)

      }, 1000);
    }


    return () => {
      clearInterval(intervalo)
    };
  }, [time, toggleBoolean, minutes, seconds]);

    //manejar el boton de play pause
    const togglePlay = () => {
      if (toggleBoolean === false) {
        setAmount(time);
        setToggleBoolean(true);
      } else {
        setToggleBoolean(false);
      }
    }
    //funcion para mostrar el tiempo como un reloj
    const showTime = () => {
      return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    const restart = () => {
      setSeconds(0);
      setMinutes(25);
      setToggleBoolean(false);
    }

    const showAmount = () => {
      return Math.floor(amount/60);
    }


  return (

    
    <div className='container text-center row flex-column text-light gap-5'>
      <header>
        <h1 className='m-2'>25 + 5 clock</h1>
      </header>

      <div className='container-fluid row flex-row'>
        <HandlerLength title="Break Length" amount={5} />
        <HandlerLength title="Session Length" amount={showAmount()} />
      </div>

      <SessionBreak time={showTime()} title={'Session'} />
      <div>
        <button className='btn btn-light' onClick={togglePlay}><FontAwesomeIcon icon={toggleBoolean ? faPause : faPlay} /></button>
        <button className='btn btn-light' onClick={restart}><FontAwesomeIcon icon={faRepeat}/></button>
      </div>
    </div>
  );
}

export default App;
