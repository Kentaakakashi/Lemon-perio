function calculate() {
  let lastPeriodInput = document.getElementById("lastPeriod").value;
  let cycleLength = parseInt(document.getElementById("cycleLength").value);

  if (!lastPeriodInput || isNaN(cycleLength)) {
    document.getElementById("output").innerHTML = "⚠️ Please fill all the details cutie.";
    return;
  }

  let lastPeriod = new Date(lastPeriodInput);
  let nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

  let today = new Date();
  let daysLeft = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));
  let cycleDay = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) + 1;

  // Mood prediction
  let mood = "";
  if (cycleDay <= 5) mood = "🩸 Low energy, comfort her.";
  else if (cycleDay <= 14) mood = "🌼 Energetic & happy vibes.";
  else if (cycleDay <= 20) mood = "🔥 Extra clingy, give attention.";
  else if (cycleDay <= cycleLength) mood = "⚡ Mood storm possible 😭.";
  else mood = "🤔 Out of range, maybe wrong date.";

  // Funny caring message
  let message = "";
  if (daysLeft > 5) {
    message = `🌸 Chill, ${daysLeft} days left. Be your goofy self 😝.`;
  } else if (daysLeft > 0) {
    message = `🍫 Only ${daysLeft} days left. Stock chocolates, champ.`;
  } else if (daysLeft === 0) {
    message = `🚨 Today’s the day! Hug her tight ❤️.`;
  } else {
    message = `⏳ Period might’ve started already. Double-check, bro.`;
  }

  // Output
  document.getElementById("output").innerHTML = `
    <b>Next period:</b> ${nextPeriod.toDateString()} <br>
    <b>Cycle Day:</b> ${cycleDay} <br>
    ${message}
  `;

  document.getElementById("mood").innerHTML = `
    <b>Today's Mood:</b> ${mood}
  `;

  // Save to history
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push({ last: lastPeriodInput, next: nextPeriod.toDateString() });
  if (history.length > 5) history.shift(); // keep last 5 records
  localStorage.setItem("history", JSON.stringify(history));

  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  let html = "<b>📜 History:</b><br>";
  history.forEach((h, i) => {
    html += `#${i+1} 🗓️ ${h.last} → ${h.next}<br>`;
  });
  document.getElementById("history").innerHTML = html;
}

// Auto-fill saved data
window.onload = function() {
  let savedDate = localStorage.getItem("lastPeriod");
  let savedCycle = localStorage.getItem("cycleLength");

  if (savedDate) document.getElementById("lastPeriod").value = savedDate;
  if (savedCycle) document.getElementById("cycleLength").value = savedCycle;

  renderHistory();
};
