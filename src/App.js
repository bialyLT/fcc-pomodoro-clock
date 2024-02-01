import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';
import  SessionBreak  from './components/SessionBreak';
import  HandlerLength  from './components/HandlerLength';


function App() {

  const [toggleBoolean, setToggleBoolean] = useState(false);
  const [breakOrSession, setBreakOrSession] = useState(false);
  const [sessionTime, setSessionTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5*60);
  let [displayTime, setDisplayTime] = useState(25*60);
  const [titleDisplay, setTitleDisplay] = useState("Session");


  useEffect(() => {
    let intervalo;

    let timeDisplay = () => {
      return breakOrSession ? sessionTime : breakTime;
    }
    let displayTitle = () => {
      return breakOrSession ? 'Session' : 'Break';
    }
    if (toggleBoolean && displayTime >= 0) {
      intervalo = setInterval(() => {


        if (displayTime === 0) {
          setBreakOrSession(!breakOrSession);
          setDisplayTime(timeDisplay());
          setTitleDisplay(displayTitle());
        } else {
          setDisplayTime(displayTime - 1);
        }
      }, 100);
    }


    return () => {
      clearInterval(intervalo);
    };
  }, [toggleBoolean, displayTime, breakTime, sessionTime, breakOrSession]);


    



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
    //funcion para reiniciar el contador del display
    const restart = () => {
      setToggleBoolean(false);
      setDisplayTime(sessionTime);
      setTitleDisplay("Session")
    }

    //funcion para manejar los botones de la longitud de las sesiones
    const handleTime = (type, amount) => {

      if (type === 'break') {
        if (breakTime === 60 && amount < 0) {
          return;
        }
        if (breakTime === 3600 && amount > 0) {
          return;
        }
        setBreakTime(prev => prev + amount)
      } else{
        if (sessionTime === 60 && amount < 0) {
          return;
        }
        if (sessionTime === 3600 && amount > 0) {
          return;
        }         
        setSessionTime(prev => prev + amount);
        if (!toggleBoolean) {
          setDisplayTime(sessionTime + amount )
        }
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
          time={breakTime}
          type='break'
          handleClick={handleTime}
          increment='break-increment' 
          decrement='break-decrement' 
          showTime={showTime} 
          idLabel='break-label'
          idLength="break-length"
           />


        <HandlerLength 
          title="Session Length" 
          time={sessionTime}
          type='session'
          handleClick={handleTime} 
          increment='session-increment' 
          decrement='session-decrement' 
          showTime={showTime}
          idLabel='session-label'
          idLength="session-length" />
      </div>

      <SessionBreak 
        time={displayTime}
        showTime={showTime} 
        title={titleDisplay}
        idTitle='timer-label'
        idTime='time-left' />
      <div className='row gap-2 justify-content-center align-content-center'>
        <button className='btn btn-light col-2' onClick={togglePlay} id="start_stop" ><FontAwesomeIcon icon={toggleBoolean ? faPause : faPlay} /></button>
        <button className='btn btn-light col-2' onClick={restart} id='reset' ><FontAwesomeIcon icon={faRepeat}/></button>
        <p className='col-12 mt-5'>Designed and Coded by <a href='https://github.com/bialyLT/pomodoro-clock-react' target='_blank' rel="noreferrer" className='bi bi-github link-opacity-25-hover link-underline link-underline-opacity-0 link-light'>BialyLT</a></p>
      </div>
    </div>
  );
}

export default App;
