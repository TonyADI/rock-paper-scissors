import React, { useEffect, useState } from 'react';
import './App.css';
import Choice from '../Choice/Choice';
import left from './left.png';
import right from './right.png';


const App = () => {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const [opposition, setOpposition] = useState('');
  const [player, setPlayer] = useState('');
  const [results, setResults] = useState('');
  const [topWins, setTopWins] = useState(0);
  const [currentWins, setCurrentWins] = useState(0);
  const [color, setColor] = useState('');
  const [tries, setTries] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const startAnimation = () => {
    let player = document.getElementById('player');
    player.style.animationName = 'player';
    player.style.animationDuration = '2s';
    let opposition = document.getElementById('opposition');
    opposition.style.animationName = 'opposition';
    opposition.style.animationDuration = '2s';
    setTimeout(() => {
    player.style.animationName = '';
    player.style.animationDuration = '';
    opposition.style.animationName = '';
    opposition.style.animationDuration = '';
    setDisabled(false);
    }, 1600)
  }

  const handleClick = choice => {
    setDisabled(true);
    setTimeout(() => {
      setPlayer(choice);
      setOpposition(choices[Math.floor(Math.random() * 3)]);
      setTries(tries + 1);
    }, 1500);
    startAnimation();
  }

  const setHighScore = () => {
    if(currentWins >= topWins){
      setTopWins(currentWins + 1)
    }
  }

  const result = () => {
    if(player && opposition){
      if((player === 'Rock' && opposition === 'Scissors') || (player === 'Paper' && opposition === 'Rock') || 
      (player === 'Scissors' && opposition === 'Paper')){
        setResults('Winner!!');
        setColor('#28a745')
        setCurrentWins(currentWins + 1);
        setHighScore();
      }
      else if(player === opposition){
        setResults('Draw!!')
        setColor('#ffc107')
      }
      else{
        setResults('Loser!!');
        setColor('#dc3545')
      }
    }
  }

  const newGame = () => {
    setResults('');
    setPlayer('');
    setOpposition('');
    setCurrentWins(0);
    setTries(0)
  }

  useEffect(result, [tries]);

  return (
    <div className="App-body">
        <h1>Rock, Paper, Scissors!</h1>
        <button className="reset button" onClick={newGame}>Reset</button>
        <br />
        <div>Longest Streak: {topWins}</div>
        <div>Current Streak: {currentWins} </div>
        <div>Computer: {opposition}</div>
        <div>You: {player}</div>
        {choices.map(choice => <Choice key={choices.indexOf(choice)} name={choice} onClick={handleClick} disabled={disabled}/>)}
        <div>
          <div className="inline-display fists-container"><img src={left} id='player' 
          alt='a cartoon left fist'></img></div>
          <div className="inline-display fists-container"><img src={right} id='opposition' 
          alt='a cartoon right fist'></img></div>
        </div>
        <div><h1 style={{color: color}}>{results}</h1></div>
        <div><h1>Tries: {tries}</h1></div>
    </div>
  );
}

export default App;
