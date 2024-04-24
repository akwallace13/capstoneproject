//click effect for sidebar for mobile users/smaller screens
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle
})
//end sidebar for mobile users/small screens

//game content
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 10;

//get word
const getRandomWord = () => {
    const { word } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

//show modal based on game outcome
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct answer was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

//find letter
const initGame = (button, clickedLetter) => {
    //console.log(button, clickedLetter);
    if(currentWord.includes(clickedLetter)) {
        //console.log(clickedLetter, "is in the puzzle");
        //show letters in puzzle
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push();
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        //wrong letter updates counter, image
        //console.log(clickedLetter, "is not in the puzzle");
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.png`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    ///create module pop-up
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

//keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    //console.log(String.fromCharCode(i));
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
//end game content