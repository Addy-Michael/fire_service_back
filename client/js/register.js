const firstName = document.querySelector("#fname"),
  lastName = document.querySelector("#lname"),
  mail = document.querySelector("#mail"),
  tel = document.querySelector("#tel"),
  dob = document.querySelector("#dob"),
  gen = document.querySelector("#gen"),
  role = document.querySelector("#rol"),
  password = document.querySelector("#password"),
  confirmPass = document.querySelector("#confirmPass"),
  signUp = document.querySelector(".signUp"),
  formContent = document.querySelector(".register__form--content"),
  formName = formContent.querySelector(".name");

signUp.addEventListener("click", () => {
  const initial =
    firstName.value.substring(0, 1).toUpperCase() +
    lastName.value.substring(0, 1).toUpperCase();
  const randNum = Math.ceil(Math.random() * 500 + 1);

  const data = {
    firstname: firstName.value,
    surname: lastName.value,
    email: mail.value,
    dob: dob.value,
    gender: gen.value,
    password: password.value,
    confirmPassword: confirmPass.value,
    staffID: initial + randNum,
    role: role.value.toLowerCase(),
    contact: tel.value,
  };

  console.log(role.value.toLowerCase());

  user.registerUser("/api/v1/users/signup", data).then((user) => {
    if (user.status === "successful") {
      ui.alert("User account created", "alert__success", formName, formContent);

      setTimeout(() => {
        document.querySelector(".alert").remove();
        window.location.href = "/dashboard.html";
      }, 3000);
    } else {
      if (user.status === "failed" && user.error.code === 11000) {
        ui.alert("Email already exist", "alert__danger", formName, formContent);

        setTimeout(() => {
          document.querySelector(".alert").remove();
        }, 3000);
      } else if (
        user.status === "failed" &&
        user.error.name === "ValidationError"
      ) {
        ui.alert(
          "Please fill all fields",
          "alert__danger",
          formName,
          formContent
        );
        setTimeout(() => {
          document.querySelector(".alert").remove();
        }, 3000);
      }
    }
  });
});
