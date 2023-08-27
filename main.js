const createDisplay = () => {
  const inputTextBox = document.querySelector("#input-box");
  const verifyButton = document.querySelector("#verify-button");
  const resultContainer = document.querySelector("#result-box");
  const attemptsContainer = document.querySelector("#attempts-box");
  const guessesContainer = document.querySelector("#guesses");
  const scoreContainer = document.querySelector("#score-card");
  const previousGameResultContainer = document.querySelector(
    "#previous-game-result"
  );

  inputTextBox.focus();

  const display = new Display({
    inputTextBox,
    verifyButton,
    resultContainer,
    attemptsContainer,
    guessesContainer,
    scoreContainer,
    previousGameResultContainer,
  });

  return display;
};

const main = () => {
  const potentialSecretWords = [
    "there",
    "dream",
    "guard",
    "flood",
    "adult",
    "sight",
    "alarm",
    "force",
    "wound",
  ];
  const wordle = new Wordle(potentialSecretWords, 6);
  const display = createDisplay();
  const wordleStats = new WordleStats();

  const wordleController = new WordleController(wordle, display, wordleStats);

  wordleController.start();
};

window.onload = main;
