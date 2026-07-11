document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("code-bg");
if (!container) return;

const snippets = [
"<div>",
"</>",
"const x = 1;",
"function()",
"return true;",
"if(x > 0)",
"let data;",
"{ }",
"console.log()",
"async await",
"for(i=0;i<10;i++)"
];

for (let i = 0; i < 40; i++) {

const code = document.createElement("span");

code.innerText = snippets[Math.floor(Math.random()*snippets.length)];

code.className = `
absolute
text-blue-200
font-mono
text-sm
animate-float
`;

code.style.left = Math.random()*100 + "%";
code.style.top = Math.random()*100 + "%";

code.style.opacity = Math.random()*0.5 + 0.3;

container.appendChild(code);

}

});