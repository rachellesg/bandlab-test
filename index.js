let posts;
let users;

function fetchData() {
  const fetchPosts = fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((response) => response.json());

  const fetchUsers = fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((response) => response.json());

  Promise.all([fetchPosts, fetchUsers])
    .then(([postsResult, usersResult]) => {
      posts = postsResult;
      users = usersResult;
      displayPosts(posts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', fetchData);

function sortPosts() {
  const newPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
  posts = newPosts;
  displayPosts(posts);
}

const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', sortPosts);

function displayPosts(posts) {
  const container = document.getElementById('container');
  container.innerHTML = JSON.stringify(posts);

}