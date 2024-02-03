import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';
import  SessionBreak  from './components/SessionBreak';
import  HandlerLength  from './components/HandlerLength';
import audioClock from './assets/audioClock.mp3';


function App() {


  // controla el boton play/pause
  const [toggleBoolean, setToggleBoolean] = useState(false);
  // controla la vista del display (elige entre session o break)
  const [breakOrSession, setBreakOrSession] = useState(false);
  // estado que maneja el tiempo de cada sesion
  const [sessionTime, setSessionTime] = useState(25*60);
  // estado que maneja el tiempo de cada break
  const [breakTime, setBreakTime] = useState(5*60);
  // estado que maneja el tiempo del display 
  let [displayTime, setDisplayTime] = useState(25*60);
  // estado que maneja el titulo del display
  const [titleDisplay, setTitleDisplay] = useState("Session");
  // estado que maneja la alarma que se ejecuta en cada finalizacion de tiempo
  const [audio, setAudio] = useState(new Audio(audioClock));


  useEffect(() => {
    let intervalo;
    // funcion para elegir que tiempo mostrara el display
    let timeDisplay = () => {
      return breakOrSession ? sessionTime : breakTime;
    }
    // funcion para elegir que titulo mostrara el display
    let displayTitle = () => {
      return breakOrSession ? 'Session' : 'Break';
    }
    // intervalo que maneja el temporizador del display
    if (toggleBoolean && displayTime >= 0) {
      intervalo = setInterval(() => {

        // en esta condicion cambiamos de sesion a break o viceversa cuando el tiempo llega a 0 y ejecutamos la alarma
        if (displayTime === 0) {
          setBreakOrSession(!breakOrSession);
          setDisplayTime(timeDisplay());
          setTitleDisplay(displayTitle());
          audio.play();
          audio.currentTime = 0;
        } else {
          // cuenta regresiva del display
          setDisplayTime(displayTime - 1);
        }
      }, 1000);
    }


    return () => {
      //eliminamos el intervalo al terminar
      clearInterval(intervalo);
    };
  }, [toggleBoolean, displayTime, breakTime, sessionTime, breakOrSession, audio]);


    



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
      setTitleDisplay("Session");
      audio.pause();
      audio.currentTime = 0;
    }

    //funcion para manejar los botones de la longitud de las sesiones
    const handleTime = (type, amount) => {
      if (!toggleBoolean) {
        
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
          // aca asignamos al display el tiempo de sesion al darle al boton play
          if (!toggleBoolean) {
            setDisplayTime(sessionTime + amount )
          }
        }
      }
      }
      
      
      
      
  return (

    
    <div className='container text-center row flex-column text-light gap-5'>
      <header>
        <h1 className='m-2'>25 + 5 clock</h1>
      </header>
      
      {/* componente que maneja el tiempo de los breaks */}
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

        {/* componente que maneja el tiempo de las sesiones */}
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

      { /* componente donde mostramos la cuenta regresiva  */}
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
