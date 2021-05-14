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
  navPicture = document.querySelector(".profilePicture").querySelector("img");

let staffID;

document.addEventListener("DOMContentLoaded", () => {
  // disable buttons
  gender.disabled = true;
  dob.disabled = true;
  role.disabled = true;
  mail.disabled = true;

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

  user
    .updateUser(`/api/v1/users/${staffID}`, formData)
    .then(() => window.location.reload());
});

deleteProfile.addEventListener("click", () => {
  user
    .deleteUser(`/api/v1/users/${staffID}`)
    .then(() => (window.location.href = "/signin.html"));
});
