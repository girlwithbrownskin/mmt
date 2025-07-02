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
    {
      name: "🌪️ Chaotic Good",
      condition: (score) => score >= 6,
    },
    {
      name: "🌸 Delulu Dreamer",
      condition: (score) => score >= 4,
    },
    {
      name: "🧊 Stone Cold Slay",
      condition: (score) => score < 4,
    }
  ];
  
  const cardContainer = document.getElementById("card-container");
  const resultBox = document.getElementById("result");
  const moodName = document.getElementById("mood-name");
  const restartBtn = document.getElementById("restart-btn");
  
  let score = 0;
  let index = 0;
  
  function createCard(mood) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = mood.color;
    card.textContent = mood.text;
  
    let offsetX = 0, startX = 0;
    let dragging = false;
  
    const drag = (e) => {
      if (!dragging) return;
      offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
      card.style.transform = `translateX(${offsetX}px) rotate(${offsetX / 10}deg)`;
    };
  
    const release = () => {
      dragging = false;
      if (Math.abs(offsetX) > 100) {
        const direction = offsetX > 0 ? "right" : "left";
        if (direction === "right") score += mood.value;
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
    };
  
    card.addEventListener("mousedown", (e) => {
      dragging = true;
      startX = e.clientX;
    });
  
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", release);
  
    card.addEventListener("touchstart", (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
    });
  
    card.addEventListener("touchmove", drag);
    card.addEventListener("touchend", release);
  
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
  
  showCard();
  
