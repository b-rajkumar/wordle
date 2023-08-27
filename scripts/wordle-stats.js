class WordleStats {
  get previousGameResult() {
    const previousGameResult = JSON.parse(
      localStorage.getItem("previousGameResult")
    );

    return previousGameResult;
  }

  addGameResult(currentGameStats) {
    localStorage.setItem(
      "previousGameResult",
      JSON.stringify(currentGameStats)
    );
  }
}
