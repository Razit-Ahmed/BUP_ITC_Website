document.addEventListener("DOMContentLoaded", () => {

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {

const target = +counter.getAttribute("data-target");
const speed = 200;
const increment = target / speed;

const updateCount = () => {

const count = +counter.innerText;

if (count < target) {

counter.innerText = Math.ceil(count + increment);
setTimeout(updateCount, 10);

} else {

counter.innerText = target;

}

};

updateCount();

};

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

animateCounter(entry.target);
observer.unobserve(entry.target);

}

});

}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

});