const moods = [
    {
      text: "Feeling extra sweet 🍬 — Rasgulla Vibes",
      value: 1,
      color: "#ffe0f0"
    },
    {
      text: "Want to cause drama 🤭 — Imli Goli Energy",
      value: 1,
      color: "#ffd6b3"
    },
    {
      text: "Feeling desi & deep 😌 — Gulab Jamun Core",
      value: 1,
      color: "#ffcccb"
    },
    {
      text: "Totally zoned out 😶 — Kaju Katli Vibes",
      value: 0,
      color: "#f0e5ff"
    },
    {
      text: "Cringe-core slay 💅 — Jalebi Spirals",
      value: 1,
      color: "#ffd9e8"
    },
    {
      text: "Existential again 🌀 — Soan Papdi Struggle",
      value: 1,
      color: "#f5ffde"
    },
    {
      text: "Spicy menace unlocked 🌶️ — Pani Puri Power",
      value: 1,
      color: "#fdf5e6"
    },
    {
      text: "Delulu but hungry 😋 — Besan Ladoo Lust",
      value: 1,
      color: "#ffeaa7"
    }
  ];
  
  const results = [
    { name: "🌪️ Chaotic Good", condition: (score) => score >= 7 },
    { name: "🌸 Delulu Dreamer", condition: (score) => score === 6 },
    { name: "💀 Reality-Dodger", condition: (score) => score === 5 },
    { name: "🔥 Certified Drama Snack", condition: (score) => score === 4 },
    { name: "💫 Flop Era Explorer", condition: (score) => score === 3 },
    { name: "🧊 Stone Cold Slay", condition: (score) => score === 2 },
    { name: "🍵 Mid & Unbothered", condition: (score) => score === 1 },
    { name: "🫠 Soan Papdi Energy", condition: (score) => score === 0 }
  ];
  
  const cardContainer = document.getElementById("card-container");
  const resultBox = document.getElementById("result");
  const moodName = document.getElementById("mood-name");
  const restartBtn = document.getElementById("restart-btn");
  const reactionBox = document.getElementById("reaction-box");
  
  let score = 0;
  let index = 0;
  
  function createCard(mood) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = mood.color;
    card.textContent = mood.text;
  
    let startX = 0, currentX = 0, offsetX = 0;
    let dragging = false;
  
    function onMove(e) {
      if (!dragging) return;
      currentX = (e.touches ? e.touches[0].clientX : e.clientX);
      offsetX = currentX - startX;
      card.style.transform = `translateX(${offsetX}px) rotate(${offsetX / 10}deg)`;
    }
  
    function onEnd() {
      dragging = false;
      if (Math.abs(offsetX) > 100) {
        const direction = offsetX > 0 ? "right" : "left";
        if (direction === "right") score += mood.value;
  
        showReaction(mood.text);
  
        card.style.transition = "transform 0.4s ease";
        card.style.transform = `translateX(${offsetX > 0 ? 1000 : -1000}px) rotate(${offsetX / 5}deg)`;
  
        setTimeout(() => {
          card.remove();
          index++;
          if (index < moods.length) {
            showCard();
          } else {
            showResult();
          }
        }, 400);
      } else {
        card.style.transition = "transform 0.3s ease";
        card.style.transform = "translateX(0)";
      }
    }
  
    card.addEventListener("mousedown", (e) => {
      dragging = true;
      startX = e.clientX;
      card.style.transition = "none";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", () => {
        onEnd();
        document.removeEventListener("mousemove", onMove);
      }, { once: true });
    });
  
    card.addEventListener("touchstart", (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
      card.style.transition = "none";
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", () => {
        onEnd();
        document.removeEventListener("touchmove", onMove);
      }, { once: true });
    });
  
    return card;
  }
  
  function showCard() {
    const card = createCard(moods[index]);
    cardContainer.innerHTML = '';
    cardContainer.appendChild(card);
  }
  
  function showResult() {
    const match = results.find(r => r.condition(score));
    moodName.textContent = match.name;
    resultBox.classList.remove("hidden");
  }
  
  restartBtn.addEventListener("click", () => {
    index = 0;
    score = 0;
    resultBox.classList.add("hidden");
    cardContainer.innerHTML = "";
    showCard();
  });
  
  function showReaction(text) {
    reactionBox.textContent = `👉 ${text}`;
    reactionBox.classList.add("show");
    setTimeout(() => {
      reactionBox.classList.remove("show");
    }, 1000);
  }
  
  showCard();
  
