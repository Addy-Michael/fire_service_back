const getDay = document.querySelector(".dash-day"),
  getDate = document.querySelector(".dash-date"),
  getMonth = document.querySelector(".dash-month"),
  getYear = document.querySelector(".dash-year"),
  totalRecord = document.querySelector(".totalRecord"),
  lastestRecords = document.querySelector(".recordDetails"),
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

  // Get total records
  records
    .getAllRecords("http://127.0.0.1:3000/api/v1/records/")
    .then((data) => {
      totalRecord.textContent = data.records.length;
    });

  // Get top 4 latest records
  records
    .getTopFourRecords("http://127.0.0.1:3000/api/v1/records/new_records")
    .then((data) => {
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

  // get user
  user.getUser("api/v1/users/user").then((user) => {
    if (user.data) {
      role.textContent = user.data.role.toUpperCase();
      dashboardPicture.src = `/img/users/${user.data.photo}`;
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
