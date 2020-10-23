const PLAYER1 = {id: 1, 
                 name: "PLAYER1", 
                 choice: '', 
                 numericChoice: undefined, 
                 score: 0,
                 };

const PLAYER2 = {id: 2,
                 name: "PLAYER2", 
                 choice: '', 
                 numericChoice: undefined, 
                 score: 0};

const TIE = "TIE";

//A Constant for ROCK equal to 0
const SCISSORS = 0;

//A Constant for Paper equal to 1
const PAPER = 1;

//A Constant for SCISSORS equal to 2
const ROCK = 2;

const LIZARD = 3;

const SPOCK = 4;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        PLAYER1.choice = button.value;
        switch (button.value) {
            case "ROCK": PLAYER1.numericChoice = ROCK; break;
            case "PAPER": PLAYER1.numericChoice = PAPER; break;
            case "SCISSORS": PLAYER1.numericChoice = SCISSORS; break;
            case "LIZARD": PLAYER1.numericChoice = LIZARD; break;
            case "SPOCK": PLAYER1.numericChoice = SPOCK; break;
        }
        game();
    });
});

//(F)randomly pick for the Computer Player
function computerPlay() {
    switch (Math.floor(Math.random()*4.99)) {
        case 0:
            PLAYER2.choice = "ROCK";
            PLAYER2.numericChoice = ROCK;
            break;
        case 1:
            PLAYER2.choice = "PAPER";
            PLAYER2.numericChoice = PAPER;
            break;
        case 2:
            PLAYER2.choice = "SCISSORS";
            PLAYER2.numericChoice = SCISSORS;
            break;
        case 3:
            PLAYER2.choice = "LIZARD";
            PLAYER2.numericChoice = LIZARD;
            break;
        case 4:
            PLAYER2.choice = "SPOCK";
            PLAYER2.numericChoice = SPOCK;
            break;
    }
}

//(F) getPlayString: convert number to reference string.
function getPlayString(play) {
    switch (play) { 
        case 0: return "ROCK";//If play === 0 return "ROCK"
        case 1: return "PAPER";//else If play === 1 return "PAPER"
        case 2: return "SCISSORS";//else return "SCISSORS"
        case 3: return "LIZARD";
        case 4: return "SPOCK";
    }
}

//(F)Compare user play and computer play return winner
function playRound(player1, player2) {
    switch (Math.abs(player1.numericChoice - player2.numericChoice)) {  
        case 0: //If the absolute value of compPlay - userPlay ===0
            console.log("Player 1: " + player1.choice);
            console.log("Player 2: " + player2.choice);
            return TIE //return tie game
        case 2:
        case 4: //return Rock beats Scissors
            console.log("Player 1: " + player1.choice);
            console.log("Player 2: " + player2.choice);
            if (player1.numericChoice > player2.numericChoice) {
                player1.score++;
                return player1;
            } else {
                player2.score++;
                return player2;
            }
        case 1:
        case 3: //else If the absolute value of compPlay - userPlay === 1
            console.log("Player 1: " + player1.choice);
            console.log("Player 2: " + player2.choice);
            if (player1.numericChoice < player2.numericChoice) { //If compPlay is greater than userPlay
                player1.score++;
                return player1; //return getPlayString(compPlay) beats getPlayString(userPlay)
            } else {
                player2.score++;
                return player2; //else return getPlayString(userPlay) beats getPlayString(compPlay)
            }
    }
}

function updateScore() {
    const score = document.getElementById('player-score');

    let p1Score = document.createElement('div');
    p1Score.textContent = `${PLAYER1.name} : ${PLAYER1.score}`;
    p1Score.classList.add('score');
    let p2Score = document.createElement('div');
    p2Score.textContent = `${PLAYER2.name} : ${PLAYER2.score}`;
    p2Score.classList.add('score');
    
    score.replaceChild(p1Score, score.childNodes[0]);
    score.replaceChild(p2Score, score.childNodes[1]);

}

function updateWinner(player){
    const winnerDiv = document.getElementById('winner');
    let winner = player;
    let looser;
    if (winner.id === 1) {
        looser = PLAYER2;
    } else {
        looser = PLAYER1;
    }

    function winningString(winner, looser) {
        switch((winner.choice+looser.choice).toLowerCase()) {
            case 'scissorspaper': return `${winner.choice} cuts ${looser.choice}`;
            case 'paperrock': return `${winner.choice} covers ${looser.choice}`;
            case 'rocklizard': return `${winner.choice} crushes ${looser.choice}`;
            case 'lizardspock': return `${winner.choice} poisons ${looser.choice}`;
            case 'spockscissors': return `${winner.choice} smashes ${looser.choice}`;
            case 'scissorslizard': return `${winner.choice} decapitates ${looser.choice}`;
            case 'lizardpaper': return `${winner.choice} eats ${looser.choice}`;
            case 'paperspock': return `${winner.choice} disproves ${looser.choice}`;
            case 'spockrock': return `${winner.choice} vaporizes ${looser.choice}`;
            case 'rockscissors': return `${winner.choice} crushes ${looser.choice}`;
            default: return;
        }
    }

    const heading = document.createElement('h2');
    if (winner === TIE) {
        heading.textContent = `${winner} Game, Everyone looses`;
    } else {
        heading.textContent = `${winner.name} Wins!!`;
    }
    const para = document.createElement('p');
    para.textContent = winningString(winner, looser);

    winnerDiv.replaceChild(heading, winnerDiv.childNodes[0]);
    winnerDiv.replaceChild(para, winnerDiv.childNodes[1]);
}

function setImage(player1, player2) {
    const img = document.getElementById('play-img');

    let p1img = document.createElement('img');
    p1img.setAttribute('src', 'images/'+player1.choice.toLowerCase()+'.png');
    let p2img = document.createElement('img');
    p2img.setAttribute('src', 'images/'+player2.choice.toLowerCase()+'.png')

    img.replaceChild(p1img, img.childNodes[0]);
    img.replaceChild(p2img, img.childNodes[1]);
}

function game() {
    computerPlay();
    setImage(PLAYER1, PLAYER2);
    let round = playRound(PLAYER1, PLAYER2);

    updateScore();
    updateWinner(round);
}

updateScore();
