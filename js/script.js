
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
