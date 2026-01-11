
const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");
const searchBar = document.getElementById("searchBar");

openSearch.addEventListener("click", () => {
  searchBar.classList.add("active");
});

closeSearch.addEventListener("click", () => {
  searchBar.classList.remove("active");
});


// counter js

const counters = document.querySelectorAll(".stack-number");
counters.forEach(counter => {
  const target = +counter.dataset.target;
  const duration = 1500;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(update);
});


const items = document.querySelectorAll(".accordion-item");
const image = document.getElementById("collectionImage");

const activeItem = document.querySelector(".accordion-item.active");
if (activeItem) {
  image.src = activeItem.dataset.image;
  const content = activeItem.querySelector(".accordion-content");
  content.style.height = content.scrollHeight + "px";
}

items.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    items.forEach(i => {
      const c = i.querySelector(".accordion-content");
      c.style.height = "0";
      i.classList.remove("active");
      i.querySelector(".icon").textContent = "+";
    });

    item.classList.add("active");
    item.querySelector(".icon").textContent = "−";
    content.style.height = content.scrollHeight + "px";

    image.style.opacity = "0";
    setTimeout(() => {
      image.src = item.dataset.image;
      image.style.opacity = "1";
    }, 200);
  });
});

// counter two

const counters2 = document.querySelectorAll(".stat-number");
let hasAnimated = false;
function startCounters() {
  if (hasAnimated) return;
  hasAnimated = true;

  counters2.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      startCounters();
      observer.disconnect();
    }
  },
  { threshold: 0.4 }
);

observer.observe(document.getElementById("stats"));

//====== this code is not pushed yet ======

/* ---------- GALLERY ---------- */
const images = [
  "assets/images/gallery-1.png",
  "assets/images/rose.png",
  "assets/images/lily.png",
  "assets/images/gtg.png",
  "assets/images/gallery-1.png",
  "assets/images/rose.png",
  "assets/images/lily.png",
  "assets/images/gtg.png"
];

let index = 0;
const mainImg = document.getElementById("currentImage");
const thumbs = document.querySelectorAll(".thumbnails img");
const dots = document.getElementById("dots");

images.forEach((_, i) => {
  dots.innerHTML += `<span data-i="${i}"></span>`;
});

function showImage(i) {
  index = i;
  mainImg.src = images[i];

  thumbs.forEach(t => t.classList.toggle("active", t.dataset.index == i));
  [...dots.children].forEach(d => d.classList.toggle("active", d.dataset.i == i));
}

document.querySelector(".next").onclick = () =>
  showImage((index + 1) % images.length);

document.querySelector(".prev").onclick = () =>
  showImage((index - 1 + images.length) % images.length);

thumbs.forEach(t => t.onclick = () => showImage(t.dataset.index));
dots.onclick = e => e.target.dataset.i && showImage(e.target.dataset.i);

showImage(0);

/* ---------- RADIO + CART ---------- */
const addToCart = document.getElementById("addToCart");
const cards = document.querySelectorAll(".subscription-card");

function updateUI() {
  const purchase = document.querySelector("input[name='purchase']:checked").value;
  const fragrance = document.querySelector("input[name='fragrance']:checked").value;

  cards.forEach(c =>
    c.classList.toggle("active",
      c.querySelector("input[name='purchase']")?.value === purchase)
  );

  addToCart.href =
    `https://dummyshop.com/cart?purchase=${purchase}&fragrance=${fragrance}`;
}

document.addEventListener("change", e => {
  if (e.target.name === "purchase" || e.target.name === "fragrance") {
    updateUI();
  }
});

updateUI();
