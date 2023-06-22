let posts;
let users;

const userList = document.getElementById('userList');

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

      userList.style.display = 'inline-block'
      sortButton.style.display = 'inline-block'

      users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userList.appendChild(option);
      });
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

userList.addEventListener('change', function () {
  const selectedUserId = this.value;
  const filteredPosts = [...posts].filter(post => post.userId == selectedUserId);
  displayPosts(filteredPosts);
});

function displayPosts(posts) {
  const container = document.getElementById('container');
  container.innerHTML = '';

  posts.forEach(item => {
    const itemContainer = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = item.title;
    itemContainer.appendChild(title);

    const body = document.createElement('p');
    body.textContent = item.body;
    itemContainer.appendChild(body);

    const user = users.find(user => user.id === item.userId);
    if (user) {
      const userId = document.createElement('p');
      userId.textContent = 'User: ' + user.name;
      itemContainer.appendChild(userId);
    }

    container.appendChild(itemContainer);
  });
}