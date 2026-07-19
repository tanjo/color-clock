const colors = Array.from(document.querySelectorAll(".color"));
const clock = document.getElementById("clock");
const directions = ["left", "right", "top", "bottom"];
let activeIndex = -1;

function randomDirection() {
  return directions[Math.floor(Math.random() * directions.length)];
}

function translateFor(direction) {
  if (direction === "left") return "translate3d(-100%, 0, 0)";
  if (direction === "right") return "translate3d(100%, 0, 0)";
  if (direction === "top") return "translate3d(0, -100%, 0)";
  return "translate3d(0, 100%, 0)";
}

function opposite(direction) {
  if (direction === "left") return "right";
  if (direction === "right") return "left";
  if (direction === "top") return "bottom";
  return "top";
}

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 65 + Math.floor(Math.random() * 25);
  const lightness = 45 + Math.floor(Math.random() * 18);
  return "hsl(" + hue + " " + saturation + "% " + lightness + "%)";
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("ja-JP", { hour12: false });
}

function slideNext() {
  const nextIndex = (activeIndex + 1) % colors.length;
  const incoming = colors[nextIndex];
  const outgoing = activeIndex >= 0 ? colors[activeIndex] : null;
  const fromDirection = randomDirection();

  incoming.style.backgroundColor = randomColor();

  incoming.style.transition = "none";
  incoming.style.zIndex = "20";
  incoming.style.transform = translateFor(fromDirection);

  // Reflow to ensure transition starts from the random edge position.
  incoming.getBoundingClientRect();

  incoming.style.transition = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
  incoming.style.transform = "translate3d(0, 0, 0)";

  if (outgoing) {
    outgoing.style.zIndex = "10";
    outgoing.style.transition = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
    outgoing.style.transform = translateFor(opposite(fromDirection));
  }

  activeIndex = nextIndex;
}

updateClock();
slideNext();

setInterval(function () {
  updateClock();
  slideNext();
}, 1000);
