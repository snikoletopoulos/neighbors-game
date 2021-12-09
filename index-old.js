/* eslint-disable */

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
  let countryInfo = await fetch(
    "https://restcountries.eu/rest/v2/alpha/" + randomCountry.code
  ).then((reply) => {
    if (reply.status === 200) {
      return reply.json();
    } else throw new Error(reply.status);
  }).then(c => c.borders);
console.log(countryInfo);
  let borders = countryInfo;
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
    choices = choices.map((country) => {
      let card = new Card(country);
      card.render();
      card.card.addEventListener(
        "click",
        (cardClick = (e) => {
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
    document.querySelectorAll("article").forEach((item) => {
      borders.forEach((border) => {
        if (allCountries[border].name === item.querySelector("p").textContent)
          item.classList.add("neighbour-was-correct");
      });
    });
  }