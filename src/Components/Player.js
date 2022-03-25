export const Player = props => {
    return (
        <div className="fists-container">
            <i id={props.id} class='far fa-hand-rock'></i>
            <h4>
                {props.name}
            </h4>
            <div>
                {props.choice}
            </div>
            <div>
                {props.wins}
            </div>
        </div>
    );
}

