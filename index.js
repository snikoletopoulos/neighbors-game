const allCountries = new Array();
countryObjects.forEach(country => {
  allCountries[country.code3] = {
    code: country.code,
    name: country.name,
  };
});

//* Title object

const title = {
  emoji: null,
  country: null,
  update(country) {
    this.emoji.textContent = country2emoji2(country.code);
    this.country.textContent = country.name;
  },
};

//* Neighbour card class

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

function cardPick(border, randomCountry) {
  const neighbours = [...border];
  const countries = shuffleArray(countryObjects);

  for (let i = 0; neighbours.length < border.length * 3; i++) {
    const canBeSelected =
      !border.includes(countries[i]) && !(countries[i] === randomCountry);

    if (canBeSelected) neighbours.push(countries[i].code3);
  }
  return shuffleArray(neighbours);
}

// update game

async function gameUpdate(gameState) {
  const randomCountry = shuffleArray(countryObjects)[0];

  const response = await fetch(
    "https://restcountries.com/v3.1/alpha/" + randomCountry.code
  );
  const [countryInfo] = await response.json();
  const borders = countryInfo.borders;

  const hasAcceptableBorders =
    borders?.length && !gameState.pastUsedCountries.includes(randomCountry);
  if (!hasAcceptableBorders) {
    await gameUpdate(gameState);
    return;
  }
  title.update(randomCountry);
  gameState.pastUsedCountries.push(randomCountry);

  // game card creation

  const choices = cardPick(borders, randomCountry);
  choices.map(country => {
    const card = new Card(country);
    card.render();
    card.card.addEventListener(
      "click",
      () => {
        if (borders.includes(card.code)) {
          card.card.classList.add("neighbour-is-valid");
          updateProgressBar(borders.length, gameState);

          if (gameState.progressBarCounter === borders.length) {
            endGameState(borders, gameState);
          }
          gameState.score.textContent -= -5;
        } else {
          card.card.classList.add("neighbour-is-invalid");
          gameState.wrongAnswersCounter++;

          const hasAvailableWrongAnswers =
            gameState.wrongAnswersCounter !== borders.length;
          if (!hasAvailableWrongAnswers) {
            endGameState(borders, gameState);
          }
          gameState.score.textContent -= 3;
        }
      },
      { once: true }
    );
  });
}

function updateProgressBar(rightAnswers, gameState) {
  if (!rightAnswers) {
    document.querySelector("#current-progress").style.width = 0;
  } else {
    document.querySelector("#current-progress").style.width =
      (100 * ++gameState.progressBarCounter) / rightAnswers + "%";
  }
}

function endGameState(borders, gameState) {
  const gamePanel = document.querySelector("#neighbours-panel");

  const hasWon = gameState.progressBarCounter === borders.length;
  const hasLost = gameState.wrongAnswersCounter === borders.length;
  if (hasWon) {
    gamePanel.dataset.gameState = "Τους βρήκατε όλους!";
  }
  if (hasLost) {
    gamePanel.dataset.gameState = "Κρίμα, χάσατε!";
    document.querySelectorAll("article").forEach(item => {
      borders.forEach(border => {
        const isBorder =
          allCountries[border].name === item.querySelector("p").textContent;

        if (isBorder) {
          item.classList.add("neighbour-was-correct");
        }
        return;
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

      //remove old cards

      document
        .querySelectorAll("article")
        .forEach(item =>
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

//------------------------------------------------------------------------------
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
  reset() {
    this.progressBarCounter = 0;
    this.wrongAnswersCounter = 0;
    this.pastUsedCountries = [];
    this.round.textContent = 1;
    this.score.textContent = 0;
  },
  nextRound() {
    this.progressBarCounter = 0;
    this.wrongAnswersCounter = 0;
    this.round.textContent++;
  },
};
gameUpdate(gameState);

//event listener to new game button

document.querySelector("#btn-new-game").addEventListener("click", () => {
  if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return 0;

  //reset game state value

  gameState.reset();
  updateProgressBar(0);

  //remove old cards

  document
    .querySelectorAll("article")
    .forEach(item =>
      document.querySelector("#neighbours-panel").removeChild(item)
    );
  document.querySelector("#btn-next-round").classList.remove("btn-active");
  selector.dataset.gameState = "";

  //run new game

  gameUpdate(gameState);
});
