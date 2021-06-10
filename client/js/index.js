const header = document.querySelector(".header");

// Check if user is signed
document.addEventListener("DOMContentLoaded", () => {
  user.getUser("/api/v1/users/user").then((user) => {
    header.innerHTML = ui.headerContent(user);
    // if (user.status === "success" && user.data.role === "admin") {
    //   window.location.href = "/dashboard.html";
    // } else if (user.status === "success" && user.data.role === "staff") {
    //   window.location.href = "/userprofile.html";
    // }
  });
});
