class Wordle {
  #score;
  #hasWon;
  #gameStats;
  #secretWord;
  potentialSecretWords;
  #attemptsLeft;
  #numberOfAttempts;
  constructor(secretWords, numberOfAttempts) {
    this.#gameStats = [];
    this.#hasWon = false;
    this.#numberOfAttempts = numberOfAttempts;
    this.#attemptsLeft = numberOfAttempts;
    this.potentialSecretWords = secretWords;
  }

  #generateLetterStats(guessedWord) {
    return Array.from(guessedWord).map(letter => {
      return { letter, isPresent: false, isInCorrectPosition: false };
    });
  }

  #generateLetterStatsOfSecretWord() {
    return Array.from(this.#secretWord).map(letter => {
      return { letter, isPresent: false };
    });
  }

  #analyseLetters(word) {
    const guessedWordLetters = this.#generateLetterStats(word);
    const secretWordLetters = this.#generateLetterStatsOfSecretWord();

    const updateMatchedLetters = (currentLetterInfo, index) => {
      if (secretWordLetters[index].letter === currentLetterInfo.letter) {
        currentLetterInfo.isPresent = true;
        currentLetterInfo.isInCorrectPosition = true;
        secretWordLetters[index].isPresent = true;
      }
    };

    const updatePresentLetters = currentLetterInfo => {
      const letterInfoInSecretWord = secretWordLetters.find(letterInfo => {
        return (
          letterInfo.letter === currentLetterInfo.letter &&
          !letterInfo.isPresent
        );
      });

      if (letterInfoInSecretWord) {
        currentLetterInfo.isPresent = true;
        letterInfoInSecretWord.isPresent = true;
      }
    };

    guessedWordLetters.forEach(updateMatchedLetters);
    guessedWordLetters
      .filter(guessedLetterInfo => !guessedLetterInfo.isPresent)
      .forEach(updatePresentLetters);

    return guessedWordLetters;
  }

  guess(word) {
    if (this.isGameOver) return;

    const guessedWord = word.toUpperCase();
    const guessedWordAnalysis = this.#analyseLetters(guessedWord);
    const isGuessCorrect = this.#secretWord === guessedWord;

    if (isGuessCorrect) this.#hasWon = true;
    else this.#score -= 10;

    const result = {
      guess: word,
      guessedWordAnalysis,
      isGuessCorrect,
      attemptNumber: this.#attemptsLeft,
    };

    this.#attemptsLeft -= 1;
    this.#gameStats.push(result);

    return result;
  }

  get gameStats() {
    const guesses = this.#gameStats.map(attemptStatus => {
      return { ...attemptStatus };
    });

    const stats = {
      guesses,
      score: this.#score,
      hasWon: this.#hasWon,
      isGameOver: this.isGameOver,
      attemptsLeft: this.#attemptsLeft,
      numberOfAttempts: this.#numberOfAttempts,
    };
    if (this.isGameOver) stats.secretWord = this.#secretWord;

    return stats;
  }

  get isGameOver() {
    return this.#hasWon || this.#attemptsLeft === 0;
  }

  start() {
    this.#score = this.#numberOfAttempts * 10;
    const secretWordIndex = Math.floor(
      (Math.random() * 10) % this.potentialSecretWords.length
    );
    this.#secretWord = this.potentialSecretWords[secretWordIndex].toUpperCase();
  }
}
