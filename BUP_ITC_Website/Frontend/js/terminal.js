document.addEventListener("DOMContentLoaded", () => {

const element = document.getElementById("terminal-text");
if (!element) return;

const lines = [
"> initializing BUP ITC...",
"> loading innovation modules...",
"> compiling future tech leaders...",
"> system ready."
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {

if (charIndex < lines[lineIndex].length) {
element.textContent += lines[lineIndex].charAt(charIndex);
charIndex++;
setTimeout(typeLine, 40);
}
else {

setTimeout(() => {

element.textContent = "";
charIndex = 0;
lineIndex = (lineIndex + 1) % lines.length;

typeLine();

}, 1500);

}

}

typeLine();

});