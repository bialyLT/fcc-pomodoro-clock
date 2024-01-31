import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
function HandlerLength({ title, time, onDecrement, onIncrement, increment, decrement, showTime }) {

    const timeLength = time;

    const handlerClick = (e) => {
        if (e.target.id === decrement) {
            onDecrement();
        }
        if (e.target.id === increment) {
            onIncrement();
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <div className='row gap-3 flex-nowrap'>
                <button className='btn btn-outline-light btn-sm col-4' onClick={handlerClick} id={decrement}><FontAwesomeIcon icon={faArrowDown} size='xl'/></button>
                <p className='col-4 fs-2 fw-bold'>{showTime(timeLength)}</p>
                <button className='btn btn-outline-light btn-sm col-4' onClick={handlerClick} id={increment} ><FontAwesomeIcon icon={faArrowUp} size='xl'/></button>
            </div>
        </div>


    );
}

export default HandlerLength;