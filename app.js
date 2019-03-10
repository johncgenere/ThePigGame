var scores, roundScore, activePlayer, gamePlaying;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    /* 
        random() gives a number between 0 & 1 by multiplying by 6 we get a number between 0 & 5, 
        add one to get numbers 1-6. floor() is used to remove the decimal numbers
    */ 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;  

        // var diceDom = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // if current player rolls same double twice
        if(prevDice1 === dice1 && prevDice2 === dice2){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            switchPlayer();
        } else if(dice1 > 1 && dice2 > 1){  
            // add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // switch players
            switchPlayer();
        }

        var prevDice1 = dice1;
        var prevDice2 = dice2;
    }
})

document.querySelector('.btn-new').addEventListener('click', newGame)

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // input from user if they want to set game limit, no input default to 100
        var userInput = document.querySelector('.winning-score').value;

        if (userInput){
            var winningScore = userInput;
        } else {
            var winningScore = 100;
        }

        if(scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            gamePlaying = false;
        } else {
            switchPlayer();
        }
    }
})

function newGame(){
    scores = [0, 0];    // keep track of scores
    roundScore = 0;     // keep track of scores per round
    activePlayer = 0;   // keep track of active player
    gamePlaying = true; // keep track is game still going on or if someone won

    hideDice();         // removes dice at the beginning
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    resetCurrent();
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active'); 
    // the above was done to both in order to make sure both are cleared
    document.querySelector('.player-0-panel').classList.add('active');
      
}

function switchPlayer(){
    // 0 === player 1, 1 === player 2
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    resetCurrent(); 

    // makes changes to CSS
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();

}

function hideDice(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function resetCurrent(){
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}