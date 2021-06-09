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
  imageContainer = formContent.querySelector(".user__form-picture"),
  addReport = document.querySelector(".add"),
  loc = document.querySelector(".loc"),
  cod = document.querySelector(".dis"),
  report = document.querySelector(".report"),
  reportID = document.querySelector(".rnum"),
  livesAffected = document.querySelector(".uid"),
  addRecord = document.querySelector(".records").querySelector(".content"),
  rec = addRecord.querySelector(".rec"),
  getDay = document.querySelector(".dash-day"),
  getDate = document.querySelector(".dash-date"),
  getMonth = document.querySelector(".dash-month"),
  getYear = document.querySelector(".dash-year");

let staffID;

document.addEventListener("DOMContentLoaded", () => {
  ui.loadYearToDom(getYear);
  ui.loadDateToDom(getDate);
  ui.loadDateValuesToDom(days, getDay);
  ui.loadDateValuesToDom(months, getMonth);

  // disable buttons
  gender.disabled = true;
  role.disabled = true;

  //get user
  user.getUser("api/v1/users/user").then((user) => {
    if (user.data) {
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
      window.location.href = "/index.html";
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
      }, 3 * 1000);
    });
});

// Add report
addReport.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    loc.value !== "" &&
    reportID.value !== "" &&
    livesAffected.value !== "" &&
    cod.value !== "" &&
    getDay.value !== "" &&
    getMonth.value !== "" &&
    getDate.value !== "" &&
    getYear.value !== "" &&
    report.value !== ""
  ) {
    const data = {
      location: loc.value,
      reportID: reportID.value,
      livesAffected: livesAffected.value,
      causeOfDiaster: cod.value,
      day: getDay.value,
      month: getMonth.value,
      dayNum: getDate.value,
      year: getYear.value,
      report: report.value,
    };

    records.addRecord("/api/v1/records/", data).then((record) => {
      ui.alert("Record added", "alert__success", rec, addRecord);

      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    });
  } else {
    ui.alert("Please fill all fields", "alert__danger", rec, addRecord);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
});

// image preview
img_input.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      image.setAttribute("src", this.result);
    });

    reader.readAsDataURL(file);
  } else {
    image.src = "/img/users/profile.jpg";
  }
});
