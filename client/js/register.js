const firstName = document.querySelector("#fname"),
  lastName = document.querySelector("#lname"),
  mail = document.querySelector("#mail"),
  tel = document.querySelector("#tel"),
  dob = document.querySelector("#dob"),
  gen = document.querySelector("#gen"),
  password = document.querySelector("#password"),
  confirmPass = document.querySelector("#confirmPass"),
  signUp = document.querySelector(".signUp");

signUp.addEventListener("click", () => {
  const data = {
    firstname: firstName.value,
    surname: lastName.value,
    email: mail.value,
    dob: dob.value,
    gender: gen.value,
    password: password.value,
    confirmPassword: confirmPass.value,
    staffID: "B06",
    role: "admin",
    contact: tel.value,
  };

  user.registerUser("/api/v1/users/signup", data).then((user) => {
    if (user.status === "successful") {
      window.location.href = "/dashboard.html";
    } else {
      console.log(user);
    }
  });
});
