class WordleController {
  #wordle;
  #display;
  #wordleStats;
  constructor(wordle, display, wordleStats) {
    this.#wordle = wordle;
    this.#display = display;
    this.#wordleStats = wordleStats;
  }

  #renderGameStats() {
    const gameStats = this.#wordle.gameStats;
    const previousGameResult = this.#wordleStats.previousGameResult;

    if (gameStats.isGameOver) {
      this.#wordleStats.addGameResult({
        score: gameStats.score,
        word: gameStats.secretWord,
      });
    }

    this.#display.render(gameStats, previousGameResult);
  }

  start() {
    const generateResult = guessedWord => {
      this.#wordle.guess(guessedWord);
      this.#renderGameStats();
    };

    this.#wordle.start();
    this.#display.start();
    this.#display.on("data", generateResult);
    this.#renderGameStats();
  }
}
