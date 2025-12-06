document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let guessedWordCount = 0;

    // Define the word bank
    const wordBank = ["dairy", "crane", "flute", "grape", "heart", "mount", "trace", "space", "sword", "taste"];

    // Select a random word from the word bank
    let word = wordBank[Math.floor(Math.random() * wordBank.length)];

    const keys = document.querySelectorAll(".key");

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace += 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "#f47b8e"; // Incorrect letter
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)"; // Correct letter and correct position
        }

        return "#daa520"; // Correct letter but incorrect position
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Word must be 5 letters");
            return;
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.style.backgroundColor = tileColor;
                letterEl.style.borderColor = tileColor;
            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Congratulations!");
        }

        if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
        }

        guessedWords.push([]);
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = "";
        availableSpace -= 1;
    }

    function handleKeyPress(key) {
        if (key === "enter") {
            handleSubmitWord();
            return;
        }

        if (key === "del") {
            handleDeleteLetter();
            return;
        }

        updateGuessedWords(key);
    }

    // Add event listeners to on-screen keyboard buttons
    keys.forEach(key => {
        key.addEventListener("click", ({ target }) => {
            const letter = target.getAttribute("data-key");
            handleKeyPress(letter);
        });
    });

    // Add event listener for actual keyboard
    document.addEventListener("keydown", (event) => {
        let key = event.key.toLowerCase();
        if (key === "backspace") {
            key = "del";
        }
        const keyElement = document.querySelector(`.key[data-key="${key}"]`);
        if (keyElement) {
            handleKeyPress(key);
        }
    });
});


