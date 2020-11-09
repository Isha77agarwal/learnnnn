//Game Variables
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI Elements
const UIgame = document.querySelector('.game'),
      UIminNum = document.querySelector('.min-span'),
      UImaxNum = document.querySelector('.max-span'),
      UIguessBtn = document.querySelector('#guess-value'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

//Assign UIminNum and UImaxNum
UIminNum.textContent = min;
UImaxNum.textContent = max;

//play again event listener
UIgame.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})
//Listen for guess
UIguessBtn.addEventListener('click', function(){
    let guessInt = parseInt(UIguessInput.value);

    //validate
    if(isNaN(guessInt) || guessInt < min || guessInt > max) {
        console.log("1");
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }

    //check if won
    if(guessInt === winningNum ) {
        //Game over - won
        gameOver(true , `${winningNum} is correct, YOU WIN`);
    } else {
        //wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            //Game over - lost
            gameOver(false , `Game Over, YOU LOST!. The correct number is ${winningNum} `);
        } else {
            //Game continues - wrong answer
            setMessage( `${guessInt} is not correct, ${guessesLeft} guess left.` , 'red');
            //change border color
            UIguessInput.style.borderColor = color;
            //clear Input
            UIguessInput.value = '';
        }
    }
}); 

function gameOver(won , msg) {
    won === true ? color = 'green' : color = 'red';
    
    //Disable Input
    UIguessInput.disabled = true;

    //change border color
    UIguessInput.style.borderColor = color;

    //set Text color
    UImessage.style.color = color;

    //set message
    setMessage(msg);

    // PLay Again?
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';
}

//setMessage()
function setMessage(msg , color) {
    UImessage.textContent = msg;
    UImessage.style.color = color;
}

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}