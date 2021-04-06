import React from 'react';
import './Choice.css';

const Choice = (props) => {
    const handleClick = () => {
        props.onClick(props.name);
    }

    return (
    <div className="inline-display">
        <button className="choice button" onClick={handleClick} 
        disabled={props.disabled}>{props.name}</button>
    </div>
    )
}

export default Choice;