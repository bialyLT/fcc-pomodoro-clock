import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function HandlerLength({ title, amount }) {

    return (
        <div>
            <h2 className='col-12'>{title}</h2>
            <div className='row gap-3 col-6 flex-nowrap'>
                <button className='btn btn-outline-light btn-sm col-4' ><FontAwesomeIcon icon={faArrowDown} /></button>
                <p className='col-4 fs-2'>{amount}</p>
                <button className='btn btn-outline-light btn-sm col-4' ><FontAwesomeIcon icon={faArrowUp} /></button>
            </div>
        </div>


    );
}

export default HandlerLength;