class Display {
  #inputTextBox;
  #eventListeners;
  #resultContainer;
  #attemptsContainer;
  #guessesContainer;
  #scoreContainer;
  #previousGameResultContainer;
  constructor({
    inputTextBox,
    resultContainer,
    attemptsContainer,
    guessesContainer,
    scoreContainer,
    previousGameResultContainer,
  }) {
    this.#inputTextBox = inputTextBox;
    this.#resultContainer = resultContainer;
    this.#attemptsContainer = attemptsContainer;
    this.#guessesContainer = guessesContainer;
    this.#scoreContainer = scoreContainer;
    this.#previousGameResultContainer = previousGameResultContainer;
    this.#eventListeners = {};
  }

  #readInput() {
    const data = this.#inputTextBox.value;
    this.#inputTextBox.value = "";

    return data;
  }

  #setupInput() {
    this.#inputTextBox.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const word = this.#readInput();
        const validInputPattern = /[A-Za-z]{5}/;

        if (validInputPattern.test(word)) {
          this.#inputTextBox.focus();
          this.#eventListeners.data(word);
        }
      }
    });
  }

  #updateAttemptsContainer(attemptsLeft) {
    this.#attemptsContainer.innerText = `Attempts Left: ${attemptsLeft}`;
  }

  #clearGuessesContainer() {
    const guesses = this.#guessesContainer.children;
    Object.values(guesses).forEach(guess => {
      guess.remove();
    });
  }

  #addGuessElement(guessedWordAnalysis) {
    const guessElement = document.createElement("div");
    guessElement.classList.add("guess");

    guessedWordAnalysis.forEach(
      ({ letter, isPresent, isInCorrectPosition }) => {
        const letterElement = document.createElement("div");
        let bgColor = "grey";

        if (isPresent && isInCorrectPosition) bgColor = "green";
        else if (isPresent) bgColor = "yellow";

        letterElement.innerText = letter;
        letterElement.classList.add("letter", bgColor);

        guessElement.appendChild(letterElement);
      }
    );

    this.#guessesContainer.appendChild(guessElement);
  }

  #addEmptyGuessElement() {
    const guessElement = document.createElement("div");
    guessElement.classList.add("guess");

    for (let i = 0; i < 5; i++) {
      const letterElement = document.createElement("div");
      letterElement.classList.add("letter");
      guessElement.append(letterElement);
    }

    this.#guessesContainer.appendChild(guessElement);
  }

  #displayFinalResult(hasWon, secretWord) {}

  #showPreviousGameResult(previousGameResult) {
    const container = this.#previousGameResultContainer;

    if (previousGameResult) {
      container.innerText = `Last game : Score - ${previousGameResult.score}, Word - ${previousGameResult.word}`;
    }
  }

  #toggleGuessElementsBlur() {
    const guessElements = this.#guessesContainer.children;
    const header = document.querySelector("header");

    [...guessElements].forEach(guessElement =>
      guessElement.classList.toggle("blur")
    );

    header.classList.toggle("blur");
  }

  #startTransistion(hasWon, guesses) {
    const guessElementIndex = guesses.length - 1;
    const guessElement = document.querySelectorAll(".guess")[guessElementIndex];

    if (hasWon) {
      this.#toggleGuessElementsBlur();
      guessElement.classList.remove("blur");
      setTimeout(() => {
        guessElement.style.zIndex = 3;
        guessElement.classList.add("zoom");

        guessElement.ontransitionend = () => {
          guessElement.classList.remove("zoom");
          guessElement.classList.add("unzoom");

          guessElement.ontransitionend = () => {
            guessElement.classList.add("blur");
            this.#toggleGuessElementsBlur();
          };
        };
      }, 10);
    }
  }

  render(
    {
      guesses,
      attemptsLeft,
      isGameOver,
      score,
      hasWon,
      secretWord,
      numberOfAttempts,
    },
    previousGameResult
  ) {
    this.#clearGuessesContainer();
    this.#updateAttemptsContainer(attemptsLeft);
    this.#showPreviousGameResult(previousGameResult);

    for (let i = 0; i < numberOfAttempts; i++) {
      const guess = guesses[i];
      if (guess) this.#addGuessElement(guess.guessedWordAnalysis);
      else this.#addEmptyGuessElement();
    }

    if (isGameOver) {
      this.#inputTextBox.disabled = true;
      this.#startTransistion(hasWon, guesses);
    }
  }

  on(evt, handler) {
    this.#eventListeners[evt] = handler;
  }

  start() {
    this.#setupInput();
  }
}
