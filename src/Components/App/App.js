import React, { useEffect, useState } from 'react';
import Choice from '../Choice/Choice';
import { Player } from '../Player';
import './App.css';

const App = () => {
  const [opposition, setOpposition] = useState('');
  const [player, setPlayer] = useState('');
  const [results, setResults] = useState('');
  const [currentWins, setCurrentWins] = useState(0);
  const [oppositionWins, setOppositionWins] = useState(0);
  const [challenge, setChallenge] = useState(1);
  const [color, setColor] = useState('');
  const [tries, setTries] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const choices = ['Rock', 'Paper', 'Scissors'];
  
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
        setResults('Winner!');
        setColor('#28a745')
        setCurrentWins(currentWins + 1);
      }
      else if(player === opposition){
        setResults('Draw')
        setColor('#ffc107')
      }
      else{
        setResults('Loser!');
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
      const ans = window.confirm('You Won! Keep texting your luck?');
      if(ans){
        setChallenge(challenge + 1);
      }else{
        newGame();
      }
    }
    else if(oppositionWins === (challenge*10)){
      alert('You Lose! Better luck next time.');
      newGame();
    }
  }, [currentWins, oppositionWins])

  return (
    <div className="App-body">
        <h1>Rock, Paper, Scissors!</h1>
        <div>
            <button 
                className="button reset" 
                onClick={newGame}
            >
                Reset
            </button>
        </div>
        {choices.map(choice => 
            <Choice 
                key={choice} 
                name={choice} 
                onClick={handleClick} 
                disabled={disabled}/>
        )}
        <div>
            <h3>
                Goal: {challenge*10}
            </h3>
        </div>
        <div id="game-container">
          <Player 
            name='You'
            id='player'
            choice={player}
            wins={currentWins}/>
          <Player 
            name='Computer'
            id='opposition'
            choice={opposition}
            wins={oppositionWins}/>
        </div>
        <div>
            <h1 style={{color: color}}>
                {results}
            </h1>
        </div>
        <div>
            <h1>
                Tries: {tries}
            </h1>
        </div>
    </div>
  );
}

export default App;
