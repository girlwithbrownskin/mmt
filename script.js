const moods = [
  { text: "Peacefully rotting in bed", value: 1 },
  { text: "Villain era activated", value: 1 },
  { text: "Honestly? I’m just tired", value: 1 },
  { text: "I'm fine 🙂", value: 0 },
  { text: "Just happy to be here", value: 0 },
  { text: "This coffee is a personality", value: 1 },
  { text: "Unbothered. Moisturized. Thriving.", value: 0 },
  { text: "Screaming internally", value: 1 },
  { text: "Soft girl mode: off", value: 1 },
  { text: "Main character moment", value: 0 },
];

const results = [
  {
    name: "🌪️ Chaotic Good",
    img: "https://i.pinimg.com/originals/fc/79/52/fc7952e7ff2ed68f5a9cf9870e6c07ed.jpg",
    condition: (score) => score >= 7,
  },
  {
    name: "🌸 Delulu Dreamer",
    img: "https://i.pinimg.com/564x/23/ea/7f/23ea7f1aa896c5c90b6f689a2c3130b3.jpg",
    condition: (score) => score >= 4,
  },
  {
    name: "🧊 Stone Cold Slay",
    img: "https://i.pinimg.com/736x/f8/e3/7e/f8e37eb36a291d0d5713625b49fa7874.jpg",
    condition: (score) => score < 4,
  },
];

const cardContainer = document.getElementById("card-container");
const leftBtn = document.getElementById("swipe-left");
const rightBtn = document.getElementById("swipe-right");
const resultBox = document.getElementById("result");
const moodName = document.getElementById("mood-name");
const moodImg = document.getElementById("mood-img");
const restartBtn = document.getElementById("restart-btn");

let current = 0;
let score = 0;

function createCard(text) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerText = text;

  let startX = 0;
  let currentX = 0;
  let dragging = false;

  const setTransform = (x) => {
    card.style.transform = `translateX(${x}px) rotate(${x * 0.05}deg)`;
  };

  const resetTransform = () => {
    card.style.transition = "transform 0.3s ease";
    setTransform(0);
    setTimeout(() => (card.style.transition = ""), 300);
  };

  const handleEnd = () => {
    dragging = false;
    const deltaX = currentX - startX;
    if (deltaX > 100) {
      handleSwipe("right");
    } else if (deltaX < -100) {
      handleSwipe("left");
    } else {
      resetTransform();
    }
  };

  card.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    currentX = e.clientX;
    setTransform(currentX - startX);
  });

  document.addEventListener("mouseup", () => {
    if (dragging) handleEnd();
  });

  // Touch support
  card.addEventListener("touchstart", (e) => {
    dragging = true;
    startX = e.touches[0].clientX;
  });

  card.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    currentX = e.touches[0].clientX;
    setTransform(currentX - startX);
  });

  card.addEventListener("touchend", () => {
    if (dragging) handleEnd();
  });

  return card;
}

function showNextCard() {
  cardContainer.innerHTML = "";
  if (current >= moods.length) {
    return showResult();
  }
  const mood = moods[current];
  const card = createCard(mood.text);
  cardContainer.appendChild(card);
}

function handleSwipe(direction) {
  const mood = moods[current];
  if (direction === "right") score += mood.value;
  current++;
  showNextCard();
}

function showResult() {
  const matched = results.find((r) => r.condition(score));
  moodName.innerText = matched.name;
  moodImg.src = matched.img;
  resultBox.classList.remove("hidden");
}

function restartGame() {
  current = 0;
  score = 0;
  resultBox.classList.add("hidden");
  showNextCard();
}

leftBtn.addEventListener("click", () => handleSwipe("left"));
rightBtn.addEventListener("click", () => handleSwipe("right"));
restartBtn.addEventListener("click", restartGame);

// Start game
showNextCard();
