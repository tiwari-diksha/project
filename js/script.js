
const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");
const searchBar = document.getElementById("searchBar");

openSearch.addEventListener("click", () => {
  searchBar.classList.add("active");
});

closeSearch.addEventListener("click", () => {
  searchBar.classList.remove("active");
});
