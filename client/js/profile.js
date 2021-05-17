const navEmail = document.querySelector(".userEmail"),
  firstName = document.querySelector("#fname"),
  lastName = document.querySelector("#lname"),
  mail = document.querySelector("#mail"),
  tel = document.querySelector("#tel"),
  dob = document.querySelector("#dob"),
  role = document.querySelector("#user-role"),
  gender = document.querySelector("#gen"),
  updateProfile = document.querySelector(".updateProfile"),
  deleteProfile = document.querySelector(".delProfile"),
  img_input = document.querySelector(".img_inputs"),
  image = document.querySelector(".user__form-picture").querySelector("img"),
  navPicture = document.querySelector(".profilePicture").querySelector("img"),
  signOut = document.querySelector(".fa-sign-out-alt"),
  formContent = document.querySelector(".user__form"),
  imageContainer = formContent.querySelector(".user__form-picture");

let staffID;

document.addEventListener("DOMContentLoaded", () => {
  // disable buttons
  gender.disabled = true;
  role.disabled = true;

  //get user
  user.getUser("api/v1/users/user").then((user) => {
    if (user.data) {
      console.log(user);
      firstName.value = user.data.firstname;
      lastName.value = user.data.surname;
      navEmail.textContent = user.data.email;
      mail.value = user.data.email;
      tel.value = user.data.contact;
      //   dob.value = new Date(user.data.dob).toISOString();
      gender.value = user.data.gender;
      image.src = `/img/users/${user.data.photo}`;
      navPicture.src = `/img/users/${user.data.photo}`;
      role.value = user.data.role;
      staffID = user.data.staffID;
    } else {
      window.location.href = "/dashboard.html";
    }
  });
});

updateProfile.addEventListener("click", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("firstname", firstName.value);
  formData.append("surname", lastName.value);
  formData.append("contact", tel.value);
  if (img_input.value !== "") formData.append("photo", img_input.files[0]);

  user.updateUser(`/api/v1/users/${staffID}`, formData).then(() => {
    ui.alert(
      "User account updated",
      "alert__success",
      imageContainer,
      formContent
    );

    setTimeout(() => {
      document.querySelector(".alert").remove();
      window.location.reload();
    }, 3000);
  });
});

deleteProfile.addEventListener("click", () => {
  user.deleteUser(`/api/v1/users/${staffID}`).then(() => {
    ui.alert(
      "User account deleted",
      "alert__success",
      imageContainer,
      formContent
    );

    setTimeout(() => {
      document.querySelector(".alert").remove();
      window.location.href = "/signin.html";
    }, 3000);
  });
});

signOut.addEventListener("click", (e) => {
  e.preventDefault();

  auth
    .logout("/api/v1/users/logout")
    .then((res) => console.log(res))
    .then(() => {
      ui.alert(
        "User logged out",
        "alert__success",
        imageContainer,
        formContent
      );
      setTimeout(() => {
        document.querySelector(".alert").remove();
        window.location.href = "/index.html";
      }, 5 * 1000);
    });
});
