const getDay = document.querySelector(".dash-day"),
  getDate = document.querySelector(".dash-date"),
  getMonth = document.querySelector(".dash-month"),
  getYear = document.querySelector(".dash-year"),
  totalRecord = document.querySelector(".totalRecord"),
  totalStaff = document.querySelector(".totalStaff"),
  lastestRecords = document.querySelector(".recordDetails"),
  lastestUsers = document.querySelector(".staffDetails"),
  role = document.querySelector(".role"),
  addReport = document.querySelector(".add"),
  loc = document.querySelector(".loc"),
  cod = document.querySelector(".dis"),
  report = document.querySelector(".report"),
  reportID = document.querySelector(".rnum"),
  livesAffected = document.querySelector(".uid"),
  dashboardPicture = document.querySelector(".admin__img").querySelector("img"),
  signOut = document.querySelector(".logout"),
  addRecord = document.querySelector(".records").querySelector(".content"),
  rec = addRecord.querySelector(".rec");

document.addEventListener("DOMContentLoaded", () => {
  ui.loadYearToDom(getYear);
  ui.loadDateToDom(getDate);
  ui.loadDateValuesToDom(days, getDay);
  ui.loadDateValuesToDom(months, getMonth);

  // Check user
  user.getUser("/api/v1/users/user").then((user) => {
    if (user.status === "success" && user.data.role === "admin") {
      // Get total records
      records.getAllRecords("/api/v1/records/").then((data) => {
        totalRecord.innerHTML = `${data.records.length} <h3>Records</h3>`;
      });

      // Get total users
      user.getUsers("/api/v1/users/").then((data) => {
        totalStaff.innerHTML = `${data.length} <h3>Staffs</h3>`;
      });

      // Get top 4 latest records
      records.getTopFourRecords("/api/v1/records/new_records").then((data) => {
        let output = " ";
        data.records.forEach((record) => {
          output += `
                <div class="recordDetails__rec">
                    <div class="recordDetails__rec-id">00${record.reportID}</div>
                    <div class="recordDetails__rec-date">${record.dayNum} - ${record.month} - ${record.year}</div>
                    <div class="recordDetails__rec-delete">
                        <a href="#" class="recordDetails__rec-view"><i class="fas fa-eye"></i></a>   
                        <a href="#" class="recordDetails__rec-del"><i class="fas fa-trash"></i></a>   
                    </div>
                </div>
            `;
        });
        lastestRecords.innerHTML = output;
      });

      // Get top 4 latest users
      user.getLatestUsers("/api/v1/users/latest_users").then((data) => {
        let output = "";
        data.users.forEach((user) => {
          output += `
        <div class="staffDetails__user">
          <div class="staffDetails__user-img">
            <img src="/img/users/${user.photo}" alt="" />
          </div>
          <div class="staffDetails__user-id">${user.staffID}</div>
          <div class="staffDetails__user-role">${user.role}</div>
        </div>
        `;
        });
        lastestUsers.innerHTML = output;
      });

      // Set dashboard user image and role
      role.textContent = user.data.role.toUpperCase();
      dashboardPicture.src = `/img/users/${user.data.photo}`;
    } else if (user.status === "success" && user.data.role === "staff") {
      window.location.href = "/userprofile.html";
    } else {
      window.location.href = "/index.html";
    }
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
        window.location.reload();
      }, 3000);
    });
  } else {
    ui.alert("Please fill all fields", "alert__danger", rec, addRecord);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
});

// Log out
signOut.addEventListener("click", (e) => {
  e.preventDefault();

  auth
    .logout("/api/v1/users/logout")
    .then((res) => console.log(res))
    .then(
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 3 * 1000)
    );
});
