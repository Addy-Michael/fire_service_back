const currentPassword = document.querySelector("#currentPassword"),
  newPassword = document.querySelector("#newPassword"),
  confirmPassword = document.querySelector("#confirmPassword"),
  btnChange = document.querySelector(".change"),
  formContent = document.querySelector(".sign__form--content"),
  form = document.querySelector(".form__id");

btnChange.addEventListener("click", () => {
  const data = {
    passwordCurrent: currentPassword.value.trim(),
    password: newPassword.value.trim(),
    confirmPassword: confirmPassword.value.trim(),
  };

  auth.changepassword("/api/v1/users/updateMypassword", data).then((data) => {
    if (data.status === "successful") {
      ui.alert("User password updated", "alert__success", form, formContent);

      setTimeout(() => {
        document.querySelector(".alert").remove();
        window.location.href = "/dashboard.html";
      }, 3000);
    }

    if (data.status === "fail") {
      ui.alert(data.message, "alert__danger", form, formContent);

      setTimeout(() => {
        document.querySelector(".alert").remove();
        window.location.reload();
      }, 3000);
    }

    window.print();
  });
});
