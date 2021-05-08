const email = document.querySelector(".getStaffId"),
  password = document.querySelector(".getStaffPassword"),
  signin = document.querySelector(".btn--signIn");

signin.addEventListener("click", () => {
  const data = {
    email: email.value,
    password: password.value,
  };

  console.log(data.email.trim());
  console.log(data.password.trim());

  auth
    .login("/api/v1/users/login", data)
    .then(() => (window.location.href = "/dashboard.html"));
});
