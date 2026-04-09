
 let playerMove='';
  let score = JSON.parse(localStorage.getItem('score'))  ||  {
    wins: 0,
    losses: 0,
    ties: 0
  };
  updateScoreElement();

  /*
  if(!score){
  score = {
  wins: 0,
    losses: 0,
    ties: 0
  };
  }
*/

let isAutoPlaying = false;
let intervalId;


//const autoPlay = () => {

//};


function autoPlay(){
  const button = document.querySelector('.js-auto-play-button');

  if(!isAutoPlaying){
     intervalId = setInterval( () => {
    const playerMove = pickCompMove();
    playGame(playerMove);
  },1000);
  isAutoPlaying = true;
  button.textContent = 'stop auto play';
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    button.textContent = 'Auto Play';
  }
 
}

document.querySelector('.js-auto-play-button').addEventListener('click', () => {autoPlay()} )





 document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
 })

 document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
 })

 document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
 })

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }
  else if(event.key === 'a'){
    autoPlay();
  }
 });

  function playGame(playerMove){  
    const compMove = pickCompMove();
     let result = '';
  if(playerMove === 'scissors'){
          if(compMove === 'rock'){
           result = 'you lose';
          }else if(compMove === 'paper'){
            result = 'you win';
          }else if(compMove === 'scissors'){
            result = 'tie';
          }
  }else if(playerMove === 'paper') {
          if(compMove === 'rock'){
            result = 'you win';
          }else if(compMove === 'paper'){
            result = 'tie';
          }else if(compMove === 'scissors'){
            result = 'you lose';
          }
  }else if(playerMove === 'rock') {
          if(compMove === 'rock'){
            result = 'tie';
          }else if(compMove === 'paper'){
            result = 'you lose';
          }else if(compMove === 'scissors'){
            result = 'you win';
          }
  }

    if(result === 'you win'){
      score.wins += 1;
    }else if (result === 'you lose'){
      score.losses +=1;
    }else if (result === 'tie'){
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = `  you
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${compMove}-emoji.png" class="move-icon">
  Computer`;


  }

  function updateScoreElement(){
    document.querySelector('.js-score')
      .innerHTML = `wins: ${score.wins},losses: ${score.losses},Ties: ${score.ties}`;
  }

  function pickCompMove()  {
    const randomMove = Math.random();

   // let compMove = '';
  
      if(randomMove > 0 && randomMove < 1/3){
        compMove= 'rock';
      }else if (randomMove > 1/3 && randomMove < 2/3){
        compMove= 'paper';
      }else if(randomMove > 2/3 && randomMove < 1){
        compMove= 'scissors';
      };

      return compMove;
  }
 