let allPosts = [];
let currentIndex = 0;
const postsPerPage = 5;

const postsContainer = document.getElementById("postsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const filterSelect = document.getElementById("filterSelect");

let activeFilter = "all";

// Load posts.json
fetch("/posts.json")
  .then(res => res.json())
  .then(data => {
    allPosts = data;
    renderPosts(); // render first posts
  });

// Render posts with current filter
function renderPosts() {
  const filteredPosts = activeFilter === "all"
    ? allPosts
    : allPosts.filter(post => post.tags.includes(activeFilter));

  const nextPosts = filteredPosts.slice(currentIndex, currentIndex + postsPerPage);

  nextPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <img class="thumbnail" src="${post.thumbnail}" alt="${post.title}" />
      <h2>${post.title}</h2>
      <p>${post.description}</p>
      <small>${new Date(post.date).toLocaleDateString()}</small><br />
      <p>Tags: ${post.tags.join(", ")}</p>
      <a href="/posts/${post.slug}.html">Read more</a>
    `;
    postsContainer.appendChild(card);
  });

  currentIndex += postsPerPage;

  if (currentIndex >= filteredPosts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

// Filter dropdown event
filterSelect.addEventListener("change", (e) => {
  activeFilter = e.target.value;
  currentIndex = 0;
  postsContainer.innerHTML = "";
  renderPosts();
});

// Load more button
loadMoreBtn.addEventListener("click", () => {
  renderPosts();
});