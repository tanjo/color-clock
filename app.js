const colors = Array.from(document.querySelectorAll(".color"));
const clock = document.getElementById("clock");
const directions = [
  "left",
  "right",
  "top",
  "bottom",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
let activeIndex = -1;

const directionToTransform = {
  left: "translate3d(-100%, 0, 0)",
  right: "translate3d(100%, 0, 0)",
  top: "translate3d(0, -100%, 0)",
  bottom: "translate3d(0, 100%, 0)",
  "top-left": "translate3d(-100%, -100%, 0)",
  "top-right": "translate3d(100%, -100%, 0)",
  "bottom-left": "translate3d(-100%, 100%, 0)",
  "bottom-right": "translate3d(100%, 100%, 0)",
};

const oppositeDirection = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
  "top-left": "bottom-right",
  "top-right": "bottom-left",
  "bottom-left": "top-right",
  "bottom-right": "top-left",
};

function randomDirection() {
  return directions[Math.floor(Math.random() * directions.length)];
}

function translateFor(direction) {
  return directionToTransform[direction] || directionToTransform.right;
}

function opposite(direction) {
  return oppositeDirection[direction] || "left";
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
