const content = document.querySelector(".content"),
  search = document.querySelector(".search"),
  userId = document.querySelector(".user_id"),
  userEmail = document.querySelector(".user_email"),
  searchRecords = document.querySelector(".searchRecords"),
  query = document.querySelector(".query"),
  adminStaff = document.querySelector(".admin__staffs");
let users = [];

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
      users = data.user;
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

// email filter
userEmail.addEventListener("keyup", (e) => {
  if (userId.value !== "" && userEmail.value !== "") {
    if (!document.querySelector(".alert")) {
      ui.alert(
        "Both fields cannot be filled",
        "alert__danger",
        query,
        adminStaff
      );

      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  } else {
    const regex = new RegExp(e.target.value, "gi");
    const result = users.filter((user) => user.email.match(regex));
    content.innerHTML = `
          <div class="admin__staffs-title stickyTitle">
          <h3>Staff Image</h3>
          <h3>Staff ID</h3>
          <h3>First name</h3>
          <h3>last name</h3>
          <h3>gender</h3>
          <h3>email</h3>
          <h3>contact</h3>
          <h3>date of birth</h3>
          </div>"

          <a href="#top" class="btn search">
            <i href="#" class="fas fa-search"></i>
          </a>
`;

    result.forEach((user) => {
      let output = "";
      ui.loadUserContent(output, user, content);
    });

    ui.clearUserResult(content);
  }
});

// id filter
userId.addEventListener("keyup", (e) => {
  if (userId.value !== "" && userEmail.value !== "") {
    if (!document.querySelector(".alert")) {
      ui.alert(
        "Both fields cannot be filled",
        "alert__danger",
        query,
        adminStaff
      );

      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  } else {
    const regex = new RegExp(e.target.value, "gi");
    const result = users.filter((user) => user.staffID.match(regex));
    content.innerHTML = `
          <div class="admin__staffs-title stickyTitle">
          <h3>Staff Image</h3>
          <h3>Staff ID</h3>
          <h3>First name</h3>
          <h3>last name</h3>
          <h3>gender</h3>
          <h3>email</h3>
          <h3>contact</h3>
          <h3>date of birth</h3>
          </div>"

          <a href="#top" class="btn search">
            <i href="#" class="fas fa-search"></i>
          </a>
`;

    result.forEach((user) => {
      let output = "";
      ui.loadUserContent(output, user, content);
    });

    ui.clearUserResult(content);
  }
});

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delUser")) {
    const id = e.target.parentElement.parentElement
      .querySelector(".uid")
      .textContent.trim();
    user.deleteUser(`/api/v1/users/${id}`);
    window.location.reload();
  }
});
