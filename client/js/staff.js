const content = document.querySelector(".content");

// when dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get All Records
  user.getUsers("/api/v1/users/").then((data) => {
    let output = "";
    console.log(data);
    data.user.forEach((user) => {
      ui.loadUserContent(output, user, content);
    });
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
