import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
function HandlerLength({ title, time, handleClick, increment, decrement, showTime }) {

    return (
        <div>
            <h2>{title}</h2>
            <div className='row flex-nowrap justify-content-center align-items-center align-content-center'>
                <button className='btn btn-outline-light btn-sm col-1' onClick={() => handleClick(time - 60)} id={decrement}><FontAwesomeIcon icon={faArrowDown} size='l'/></button>
                <p className='col-3 fs-2 fw-bold m-0'>{showTime(time)}</p>
                <button className='btn btn-outline-light btn-sm col-1' onClick={() => handleClick(time + 60)} id={increment} ><FontAwesomeIcon icon={faArrowUp} size='l'/></button>
            </div>
        </div>


    );
}

export default HandlerLength;