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
  dashboardPicture = document.querySelector(".admin__img").querySelector("img");

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
      console.log(user);
      role.textContent = user.data.role.toUpperCase();
      dashboardPicture.src = `/img/users/${user.data.photo}`;
    } else {
      window.location.href = "/dashboard.html";
    }
  });
});

// Add report
addReport.addEventListener("click", () => {
  const data = {
    location: loc.value,
    reportID: reportID.value,
    livesAffected: livesAffected.value,
    causeOfDiaster: cod.value,
    day: getDay.value,
    month: getMonth.value,
    dayNum: getDate.value,
    year: getYear.value,
  };

  console.log(data);

  records.addRecord("/api/v1/records/", data).then((record) => {
    console.log(record);
  });
});
