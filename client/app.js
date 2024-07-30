const API_URL = "http://localhost:8000";
const tbody = document.querySelector(".tbody");
const form = document.querySelector(".form");
const fName = document.querySelector(".fname");
const userName = document.querySelector(".username");
const password = document.querySelector(".password");

async function fetchData(url) {
  let response = await fetch(`${url}/users`, {
    method: "GET",
  });

  response
    .json()
    .then((res) => getUsers(res))
    .catch((err) => console.log(err));
}

fetchData(API_URL);

function getUsers(data) {
  while (tbody.firstChild) {
    tbody.firstChild.remove();
  }

  data.payload?.forEach((user) => {
    let tr = document.createElement("tr");
    tr.classList.add("user");
    tr.dataset.id = user.id;

    tr.innerHTML = `
        <td>${user.fname}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td><button class="user__delete-btn">delete</button></td>
     `;

    tbody.appendChild(tr);
  });
}

function createUser(user) {
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      fetchData(API_URL);
    })
    .catch((err) => console.log(err));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newUser = {
    fname: fName.value,
    username: userName.value,
    password: password.value,
  };

  createUser(newUser);
});

function deleteUser(id) {
  if (
    window.confirm("Siz rostan ham ushbu foydalanuvchini o'chirmoqchimisiz?")
  ) {
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData(API_URL);
      })
      .catch((err) => console.log(err));
  }
}

tbody.addEventListener("click", (e) => {
  if (e.target.className === "user__delete-btn") {
    let id = e.target.closest(".user").dataset.id;
    deleteUser(id);
  }
});
