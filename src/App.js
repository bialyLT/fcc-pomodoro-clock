import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';
import  SessionBreak  from './components/SessionBreak';
import  HandlerLength  from './components/HandlerLength';


function App() {

  const [toggleBoolean, setToggleBoolean] = useState(false);
  const [sessionTime, setSessionTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5*60);

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

  return (

    
    <div className='container text-center row flex-column text-light gap-5'>
      <header>
        <h1 className='m-2'>25 + 5 clock</h1>
      </header>

      <div className='container-fluid row flex-row'>
        <HandlerLength 
          title="Break Length"
          time={breakTime}
          handleClick={setBreakTime}
          increment='break-increment' 
          decrement='break-decrement' 
          showTime={showTime} 
           />


        <HandlerLength 
          title="Session Length" 
          time={sessionTime}
          handleClick={setSessionTime} 
          increment='session-increment' 
          decrement='session-decrement' 
          showTime={showTime} />
      </div>

      <SessionBreak 
        time={sessionTime}
        showTime={showTime} 
        title={'Session'}
        onPause={toggleBoolean} />
      <div className='row gap-2 flex-nowrap justify-content-center align-content-center'>
        <button className='btn btn-light col-2' onClick={togglePlay}><FontAwesomeIcon icon={toggleBoolean ? faPause : faPlay} /></button>
        <button className='btn btn-light col-2' onClick={restart}><FontAwesomeIcon icon={faRepeat}/></button>
      </div>
    </div>
  );
}

export default App;
