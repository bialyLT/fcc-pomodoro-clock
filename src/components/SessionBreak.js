
function SessionBreak({ time, showTime, title, idTitle, idTime }) {

    return (
        <div>
            <h1 id={idTitle} >{title}</h1>
            <p className="fs-5 fw-bold" id={idTime} >{showTime(time)}</p>
        </div>
    );
}


export default SessionBreak;