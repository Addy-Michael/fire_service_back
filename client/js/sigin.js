const email = document.querySelector(".getStaffId"),
  password = document.querySelector(".getStaffPassword"),
  signin = document.querySelector(".btn--signIn"),
  formContent = document.querySelector(".sign__form--content"),
  formId = formContent.querySelector(".form__id");

// Check if user is signed
document.addEventListener("DOMContentLoaded", () => {
  user.getUser("/api/v1/users/user").then((user) => {
    if (user.status === "success" && user.data.role === "admin") {
      window.location.href = "/dashboard.html";
    } else if (user.status === "success" && user.data.role === "staff") {
      window.location.href = "/userprofile.html";
    }
  });
});

signin.addEventListener("click", () => {
  if (email.value !== "" && password.value !== "") {
    const data = {
      email: email.value.trim(),
      password: password.value.trim(),
    };

    auth.login("/api/v1/users/login", data).then((data) => {
      if (data.status === "fail") {
        ui.alert(data.message, "alert__danger", formId, formContent);

        setTimeout(() => {
          document.querySelector(".alert").remove();
          // window.location.reload();
        }, 3000);
      } else if (data.status === "successful" && data.user.role === "admin") {
        window.location.href = "/dashboard.html";
      } else if (data.status === "successful" && data.user.role === "staff") {
        window.location.href = "/userprofile.html";
      }
    });
  } else {
    ui.alert(
      "Please provide all fields to log in",
      "alert__danger",
      formId,
      formContent
    );

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
});
