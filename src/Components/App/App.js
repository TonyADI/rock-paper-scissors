import React, { useEffect, useState } from 'react';
import './App.css';
import Choice from '../Choice/Choice';

const App = () => {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const [opposition, setOpposition] = useState('');
  const [player, setPlayer] = useState('');
  const [results, setResults] = useState('');
  const [currentWins, setCurrentWins] = useState(0);
  const [oppositionWins, setOppositionWins] = useState(0);
  const [challenge, setChallenge] = useState(1);
  const [color, setColor] = useState('');
  const [tries, setTries] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const startAnimation = () => {
    let player = document.getElementById('player');
    player.classList.add('player-animation')
    let opposition = document.getElementById('opposition');
    opposition.classList.add('opposition-animation')
    setTimeout(() => {
      player.classList.remove('player-animation');
      opposition.classList.remove('opposition-animation');
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

  const result = () => {
    if(player && opposition){
      if((player === 'Rock' && opposition === 'Scissors') || (player === 'Paper' && opposition === 'Rock') || 
      (player === 'Scissors' && opposition === 'Paper')){
        setResults('Winner!!');
        setColor('#28a745')
        setCurrentWins(currentWins + 1);
      }
      else if(player === opposition){
        setResults('Draw!!')
        setColor('#ffc107')
      }
      else{
        setResults('Loser!!');
        setColor('#dc3545')
        setOppositionWins(oppositionWins + 1);
      }
    }
  }

  const newGame = () => {
    setResults('');
    setPlayer('');
    setOpposition('');
    setCurrentWins(0);
    setOppositionWins(0);
    setChallenge(1);
    setTries(0)
  }

  useEffect(result, [tries]);

  useEffect(() => {
    if(currentWins === (challenge*10)){
      alert('You Won!');
      setChallenge(challenge + 1)
    }
    else if(oppositionWins === (challenge*10)){
      alert('You Lose!');
      newGame();
    }
  }, [currentWins, oppositionWins])

  return (
    <div className="App-body">
        <h1>Rock, Paper, Scissors!</h1>
        <div><button className="reset button" onClick={newGame}>Reset</button></div>
        {choices.map(choice => <Choice key={choices.indexOf(choice)} name={choice} onClick={handleClick} disabled={disabled}/>)}
        <div>Goal: {challenge*10}</div>
        <div id="game-container">
          <div className="fists-container">
            <i class='far fa-hand-rock' id='player' style={{fontSize:'86px'}}></i>
            <div>You</div>
            <div>{player}</div>
            <div>{currentWins}</div>
          </div>
          <div className="fists-container">
            <i class='far fa-hand-rock' id='opposition' style={{fontSize:'86px'}}></i>
            <div>Computer</div>
            <div>{opposition}</div>
            <div>{oppositionWins}</div>
          </div>
        </div>
        <div><h1 style={{color: color}}>{results}</h1></div>
        <div><h1>Tries: {tries}</h1></div>
    </div>
  );
}

export default App;
