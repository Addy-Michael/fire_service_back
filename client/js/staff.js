const content = document.querySelector(".content"),
  search = document.querySelector(".search"),
  listFunc = document.querySelector(".search__functions-list");

// when dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get All Records
  user.getUsers("/api/v1/users/").then((data) => {
    if (data.status === "fail") {
      document.body.innerHTML = `
      <h1 class ="statusCode">${data.error.statusCode}</h1>
      <p class = "message">${data.message}</p>
      `;
    } else {
      let output = "";
      console.log(data);
      data.user.forEach((user) => {
        ui.loadUserContent(output, user, content);
      });
    }
  });
});

// delete user
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delUser")) {
    const id = e.target.parentElement.parentElement
      .querySelector(".uid")
      .textContent.trim();
    user.deleteUser(`/api/v1/users/${id}`);
    window.location.reload();
  }
});

// search event
let flip = false;
search.addEventListener("mouseenter", (e) => {
  if (!flip) {
    listFunc.classList.add("view");
    flip = true;
  } else {
    listFunc.classList.remove("view");
    flip = false;
  }
});
