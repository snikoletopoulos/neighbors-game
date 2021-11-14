const allCountries = new Array();
countryObjects.forEach(country => {
  allCountries[country.code3] = {
    code: country.code,
    name: country.name,
  };
});

// Title object
const title = {
  emoji: null,
  country: null,
  update(country) {
    this.emoji.textContent = country2emoji2(country.code);
    this.country.textContent = country.name;
  },
};

// Neighbour card class
class Card {
  constructor(code) {
    this.card = document.createElement("article");
    this.emoji = document.createElement("div");
    this.country = document.createElement("p");
    this.code = code;
    this.emoji.textContent = country2emoji2(allCountries[code].code);
    this.country.textContent = allCountries[code].name;
  }
  render() {
    document.querySelector("#neighbours-panel").appendChild(this.card);
    this.card.appendChild(this.emoji);
    this.card.appendChild(this.country);
  }
}

// function for card creation
function cardPick(boarder, randomCountry) {
  let neighbours = [...boarder];
  const countries = shuffleArray(countryObjects);
  for (let i = 0; neighbours.length < boarder.length * 3; i++) {
    if (!boarder.includes(countries[i]) && !(countries[i] === randomCountry))
      neighbours.push(countries[i].code3);
  }
  return shuffleArray(neighbours);
}

// update game
async function gameUpdate(gameState) {
  let randomCountry = shuffleArray(countryObjects)[0];
  let [countryInfo] = await fetch(
    "https://restcountries.com/v3.1/alpha/" + randomCountry.code
  ).then(reply => {
    if (reply.status === 200) {
      return reply.json();
    } else throw new Error(reply.status);
  });
  let borders = countryInfo.borders;
  if (
    borders.length === 0 ||
    gameState.pastUsedCountries.includes(randomCountry)
  ) {
    await gameUpdate(gameState);
  } else {
    title.update(randomCountry);
    gameState.pastUsedCountries.push(randomCountry);

    // game card creation
    let choices = cardPick(borders, randomCountry);
    choices = choices.map(country => {
      let card = new Card(country);
      card.render();
      card.card.addEventListener(
        "click",
        (cardClick = e => {
          if (borders.includes(card.code)) {
            card.card.classList.add("neighbour-is-valid");
            updateProgressBar(borders.length, gameState);
            if (gameState.progressBarCounter === borders.length)
              endGameState(borders, gameState);
            gameState.score.textContent -= -5;
          } else {
            card.card.classList.add("neighbour-is-invalid");
            gameState.wrongAnswersCounter++;
            if (gameState.wrongAnswersCounter === borders.length)
              endGameState(borders, gameState);
            gameState.score.textContent -= 3;
          }
        }),
        { once: true }
      );
    });
  }
}

function updateProgressBar(rightAnswers, gameState) {
  if (rightAnswers === 0) {
    document.querySelector("#current-progress").style.width = 0;
  } else {
    document.querySelector("#current-progress").style.width =
      (100 * ++gameState.progressBarCounter) / rightAnswers + "%";
  }
}

function endGameState(borders, gameState) {
  let gamePanel = document.querySelector("#neighbours-panel");
  if (gameState.progressBarCounter === borders.length) {
    gamePanel.dataset.gameState = "Τους βρήκατε όλους!";
  }
  if (gameState.wrongAnswersCounter === borders.length) {
    gamePanel.dataset.gameState = "Κρίμα, χάσατε!";
    document.querySelectorAll("article").forEach(item => {
      borders.forEach(border => {
        if (allCountries[border].name === item.querySelector("p").textContent)
          item.classList.add("neighbour-was-correct");
      });
    });
  }

  //next round button enabler
  const nextButton = document.querySelector("#btn-next-round");
  nextButton.classList.add("btn-active");

  //event listener to next round button
  nextButton.addEventListener(
    "click",
    () => {
      gamePanel.dataset.gameState = ""; // remove of the gray msg
      document.querySelector("#btn-next-round").classList.remove("btn-active");

      //reset game state value
      gameState.nextRound();
      updateProgressBar(0);
      const countries = document.querySelectorAll("article");

      //remove old cards
      countries.forEach(item =>
        document.querySelector("#neighbours-panel").removeChild(item)
      );
      document.querySelector("#btn-next-round").classList.remove("btn-active");
      gamePanel.dataset.gameState = "";

      //run new game
      gameUpdate(gameState);
    },
    { once: true }
  );
}

//-----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  //Page element load
  title.emoji = document.querySelector("#my-country-flag");
  title.country = document.querySelector("#my-country-name");
  const progress = document.querySelector("#current-progress");
  const selector = document.querySelector("#neighbours-panel");
  const gameState = {
    progressBarCounter: 0,
    wrongAnswersCounter: 0,
    pastUsedCountries: [],
    round: document.querySelectorAll(".game-value")[0],
    score: document.querySelectorAll(".game-value")[1],
    reset: function () {
      this.progressBarCounter = 0;
      this.wrongAnswersCounter = 0;
      this.pastUsedCountries = [];
      this.round.textContent = 1;
      this.score.textContent = 0;
    },
    nextRound: function () {
      this.progressBarCounter = 0;
      this.wrongAnswersCounter = 0;
      this.round.textContent++;
    },
  };
  gameUpdate(gameState);

  //event listener to new game button
  document.querySelector("#btn-new-game").addEventListener(
    "click",
    (newGame = () => {
      if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return 0;

      //reset game state value
      gameState.reset();
      updateProgressBar(0);
      const countries = document.querySelectorAll("article");

      //remove old cards
      countries.forEach(item =>
        document.querySelector("#neighbours-panel").removeChild(item)
      );
      document.querySelector("#btn-next-round").classList.remove("btn-active");
      selector.dataset.gameState = "";

      //run new game
      gameUpdate(gameState);
    })
  );
});
