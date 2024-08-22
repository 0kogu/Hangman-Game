// Array of words and categories for the game
const words = [
    { word: "PYTHON", category: "Programming Language" },
    { word: "JAVASCRIPT", category: "Programming Language" },
    { word: "HTML", category: "Web Technology" },
    { word: "CSS", category: "Web Technology" },
    { word: "DJANGO", category: "Framework" },
    { word: "REACT", category: "Framework" },
    { word: "ANGULAR", category: "Framework" }
];

let selectedWord, selectedCategory, tries;
const maxTries = 6;
const wordDisplay = document.getElementById('word');
const categoryDisplay = document.getElementById('category');
const triesDisplay = document.getElementById('tries');
const keyboard = document.getElementById('keyboard');
const popupContainer = document.getElementById('popup-container');
const popupMessage = document.getElementById('popup-message');
const finalWord = document.getElementById('final-word');
const playAgainBtn = document.getElementById('play-again');

// Initialize the game
function initGame() {
    // Select a random word and category
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    selectedCategory = words[randomIndex].category;

    // Reset the game variables
    tries = maxTries;
    wordDisplay.innerHTML = selectedWord.replace(/./g, '_ ');
    categoryDisplay.textContent = selectedCategory;
    triesDisplay.textContent = tries;

    // Clear the keyboard
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    }

    // Hide the popup
    popupContainer.classList.add('hidden');
}

// Handle a letter guess
function handleGuess(letter) {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent === letter) {
            button.disabled = true;
        }
    });

    if (selectedWord.includes(letter)) {
        const wordArray = wordDisplay.textContent.split(' ');
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordArray[i] = letter;
            }
        }
        wordDisplay.textContent = wordArray.join(' ');

        // Check if the player has won
        if (!wordDisplay.textContent.includes('_')) {
            showPopup(true);
        }
    } else {
        tries--;
        triesDisplay.textContent = tries;

        // Check if the player has lost
        if (tries === 0) {
            showPopup(false);
        }
    }
}

// Show the popup when the game is over
function showPopup(won) {
    popupContainer.classList.remove('hidden');
    popupMessage.textContent = won ? 'Congratulations! You guessed the word!' : 'You lost! Better luck next time!';
    finalWord.textContent = selectedWord;
}

// Start a new game when the player clicks "Play Again"
playAgainBtn.addEventListener('click', initGame);

// Initialize the game when the page loads
initGame();
