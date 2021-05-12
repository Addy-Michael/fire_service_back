const r_months = document.querySelector(".dl_months"),
  years = document.querySelector(".reportYear"),
  reportTitle = document.querySelector(".stickyTitle"),
  contents = document.querySelector(".content"),
  dl_years = document.querySelector(".dl_years"),
  searchRecords = document.querySelector(".searchRecords"),
  reportId = document.querySelector(".reportID"),
  reportMonth = document.querySelector(".reportMonth"),
  reportYear = document.querySelector(".reportYear");

// when dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  ui.loadYearToDom(years);
  ui.datalistMonth(months, r_months);
  ui.datalistYear(dl_years);

  // Get All Records
  records.getAllRecords("http://127.0.0.1:3000/api/v1/records").then((data) => {
    let output = "";
    data.records.forEach((record) => {
      const div = document.createElement("div");
      div.className = "admin__reports-view";
      output = `
                        <div class="admin__reports-view--num">
                            ${record.reportID}
                        </div>
                        <div class="admin__reports-view--livesAffected">
                            ${record.livesAffected}
                        </div>
                        <div class="admin__reports-view--COD">
                            ${record.causeOfDiaster}
                        </div>
                        <div class="admin__reports-view--location">
                            ${record.location}
                        </div>
                        <div class="admin__reports-view--DOD">
                            ${record.dayNum} - ${record.month} - ${record.month}
                        </div>
                        <div class="admin__reports-view--operations">
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-edit"></i>
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    `;
      div.innerHTML = output;
      contents.appendChild(div);
    });
  });
});

// search records
searchRecords.addEventListener("click", () => {
  if (
    reportId.value !== "" &&
    reportMonth.value !== "" &&
    reportYear.value !== ""
  ) {
    console.log("Sorry cannot search data with all fields filled");
  } else if (reportMonth.value !== "") {
    console.log("search month");
  } else if (reportMonth.value !== "" && reportYear.value !== "") {
    console.log("search data with month and year");
  } else if (reportYear.value !== "") {
    console.log("search data with year");
  } else if (reportId.value !== "") {
    console.log("search with report id");
  } else {
    console.log("please fill form to search");
  }
});
