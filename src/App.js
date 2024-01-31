import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';
import  SessionBreak  from './components/SessionBreak';
import  HandlerLength  from './components/HandlerLength';


function App() {

  const [toggleBoolean, setToggleBoolean] = useState(false);
  const [time, setTime] = useState(1*60);

  useEffect(() => {
    let intervalo;
    if (toggleBoolean && time > 0) { 
      intervalo = setInterval(() => {
        setTime(time => time - 1)
      }, 1000);
    }
    return () => {
      clearInterval(intervalo);
    };
  }, [time, toggleBoolean]);

    //manejar el boton de play pause
    const togglePlay = () => {
      if (toggleBoolean === false) {
        setToggleBoolean(true);
      } else {
        setToggleBoolean(false);
      }
    }
    //funcion para mostrar el tiempo como un reloj
    const showTime = (time) => {
      let minutes = Math.floor(time/60);
      let seconds = Math.floor(time%60);

      return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    const restart = () => {
      setToggleBoolean(false);
    }

    const handleIncrement = () => {

      if (!toggleBoolean) {
        setTime(time + 60);
      }
    }


    const handleDecrement = () => {
      if (!toggleBoolean) {
        setTime(time - 60)
      }
    }


  return (

    
    <div className='container text-center row flex-column text-light gap-5'>
      <header>
        <h1 className='m-2'>25 + 5 clock</h1>
      </header>

      <div className='container-fluid row flex-row'>
        <HandlerLength 
          title="Break Length"
          showTime={showTime} 
           />


        <HandlerLength 
          title="Session Length" 
          time={time}
          increment='session-increment' 
          decrement='session-decrement' 
          onIncrement={handleIncrement} 
          onDecrement={handleDecrement}
          showTime={showTime} />
      </div>

      <SessionBreak time={showTime(time)} title={'Session'} />
      <div>
        <button className='btn btn-light' onClick={togglePlay}><FontAwesomeIcon icon={toggleBoolean ? faPause : faPlay} /></button>
        <button className='btn btn-light' onClick={restart}><FontAwesomeIcon icon={faRepeat}/></button>
      </div>
    </div>
  );
}

export default App;
