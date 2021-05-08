const navEmail = document.querySelector(".userEmail"),
  firstName = document.querySelector("#fname"),
  lastName = document.querySelector("#lname"),
  mail = document.querySelector("#mail"),
  tel = document.querySelector("#tel"),
  dob = document.querySelector("#dob"),
  role = document.querySelector("#user-role"),
  gender = document.querySelector("#gen");

document.addEventListener("DOMContentLoaded", () => {
  // disable buttons
  gender.disabled = true;
  dob.disabled = true;
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
      role.value = user.data.role;
    } else {
      window.location.href = "/dashboard.html";
    }
  });
});
