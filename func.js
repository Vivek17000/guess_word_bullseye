hintTag = document.querySelector(".hint span"),
resetBtn = document.querySelector(".r-btn"),
guessLeft = document.querySelector(".g-l span"),
typingInput = document.querySelector(".typing-input"),
wrongLetter = document.querySelector(".w-t span");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];
const ip = document.querySelector(".ip");

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses =  8 ;
    hintTag.innerText = ranItem.hint;
    correctLetters = []; incorrectLetters = [];
    wrongLetter.innerText = incorrectLetters;
    guessLeft.innerText = maxGuesses;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        ip.innerHTML = html;
    }
}
randomWord();
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    ip.querySelectorAll("input")[i].value = key;
                }
            }

        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }

    typingInput.value = "";
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                ip.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
document.addEventListener("keydown", () => typingInput.focus());
resetBtn.addEventListener("click", randomWord);
ip.addEventListener("click", () => typingInput.focus());
typingInput.addEventListener("input", initGame);