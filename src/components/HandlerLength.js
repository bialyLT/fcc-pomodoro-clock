import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
function HandlerLength({ title, time, type, handleClick, increment, decrement, showTime, idLabel, idLength }) {

    return (
        <div>
            <h2 id={idLabel} >{title}</h2>
            <div className='row flex-nowrap justify-content-center align-items-center align-content-center'>
                <button className='btn btn-outline-light btn-sm col-1' onClick={() => handleClick(type, -60)} id={decrement}><FontAwesomeIcon icon={faArrowDown} size='l'/></button>
                <p className='col-3 fs-2 fw-bold m-0' id={idLength} >{showTime(time)}</p>
                <button className='btn btn-outline-light btn-sm col-1' onClick={() => handleClick(type, 60)} id={increment} ><FontAwesomeIcon icon={faArrowUp} size='l'/></button>
            </div>
        </div>


    );
}

export default HandlerLength;