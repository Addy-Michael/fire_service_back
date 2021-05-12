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
  records.getAllRecords("/api/v1/records").then((data) => {
    let output = "";
    data.records.forEach((record) => {
      ui.loadReportContent(output, record, contents);
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
    console.log(
      "Sorry, can search information with specifying the repod id or the month and year"
    );
  } else if (reportMonth.value !== "" && reportYear.value !== "") {
    records
      .getRecordByMonthAndYear(
        `/api/v1/records/month&year/${reportMonth.value}/${reportYear.value}`
      )
      .then((data) => {
        let output = "";
        contents.innerHTML = "";
        data.records.forEach((record) => {
          ui.loadReportContent(output, record, contents);
        });
      });
  } else if (reportYear.value !== "") {
    records
      .getRecordByYear(`/api/v1/records/year/${reportYear.value}`)
      .then((data) => {
        let output = "";
        contents.innerHTML = "";
        data.records.forEach((record) => {
          ui.loadReportContent(output, record, contents);
        });
      });
  } else if (reportId.value !== "") {
    records.getRecordById(`/api/v1/records/${reportId.value}`).then((data) => {
      let output = "";
      contents.innerHTML = "";
      ui.loadReportContent(output, data.record, contents);
    });
  } else if (reportMonth.value !== "") {
    console.log("Sorry, specify the month and year to search");
  } else {
    console.log("please fill form to search");
  }
});

contents.addEventListener("click", (e) => {
  if (e.target.classList.contains("delReport")) {
    const id = e.target.parentElement.parentElement
      .querySelector(".reportId")
      .textContent.trim();
    records.deleteRecord(`/api/v1/records/${id}`);
    window.location.reload();
  }
});
