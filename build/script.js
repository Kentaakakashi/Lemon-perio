function calculate() {
  let lastPeriod = new Date(document.getElementById("lastPeriod").value);
  let cycleLength = parseInt(document.getElementById("cycleLength").value);

  if (!lastPeriod || isNaN(cycleLength)) {
    document.getElementById("output").innerHTML = "⚠️ Please fill all the details cutie.";
    return;
  }

  let nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

  let today = new Date();
  let daysLeft = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

  let message = "";
  if (daysLeft > 5) {
    message = `🌸 Chill, ${daysLeft} days left. Be the silly bf till then 😝.`;
  } else if (daysLeft > 0) {
    message = `🍫 Only ${daysLeft} days left. Better stock up chocolates, champ.`;
  } else if (daysLeft === 0) {
    message = `🚨 Today’s the day! Hug her tight & don’t mess up 😤❤️.`;
  } else {
    message = `⏳ Cycle might’ve started already. Double-check, bro.`;
  }

  document.getElementById("output").innerHTML = `
    <b>Next period:</b> ${nextPeriod.toDateString()} <br><br>
    ${message}
  `;

  localStorage.setItem("lastPeriod", document.getElementById("lastPeriod").value);
  localStorage.setItem("cycleLength", cycleLength);
}

window.onload = function() {
  let savedDate = localStorage.getItem("lastPeriod");
  let savedCycle = localStorage.getItem("cycleLength");

  if (savedDate) document.getElementById("lastPeriod").value = savedDate;
  if (savedCycle) document.getElementById("cycleLength").value = savedCycle;
};
