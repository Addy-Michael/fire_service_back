const years = document.querySelector(".reportYear"),
  reportTitle = document.querySelector(".stickyTitle"),
  contents = document.querySelector(".content"),
  searchRecords = document.querySelector(".searchRecords"),
  search = document.querySelector(".search"),
  listFunc = document.querySelector(".search__functions-list"),
  searchMonthYear = listFunc.querySelector(".monthNyear"),
  searchYear = listFunc.querySelector(".year"),
  searchId = listFunc.querySelector(".id"),
  adminReport = document.querySelector(".admin__reports"),
  queryContain = document.querySelector(".queryContain");

// when dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get All Records
  records.getAllRecords("/api/v1/records").then((data) => {
    let output = "";
    data.records.forEach((record) => {
      ui.loadReportContent(output, record, contents);
    });
  });
});

// search records
queryContain.addEventListener("click", (e) => {
  if (e.target.classList.contains("yearly")) {
    const reportYear = document.querySelector(".reportYear");
    if (reportYear.value !== "") {
      records
        .getRecordByYear(`/api/v1/records/year/${reportYear.value}`)
        .then((data) => {
          if (data.status === "fail") {
            ui.alert(data.message, "alert__danger", queryContain, adminReport);

            setTimeout(() => {
              document.querySelector(".alert").remove();
            }, 3000);
          } else {
            let output = "";
            contents.innerHTML = `<div class="admin__reports-title stickyTitle">
          <h3>Report ID</h3>
          <h3>Lives affected</h3>
          <h3>cause of diaster</h3>
          <h3>location</h3>
          <h3>Date</h3>
        </div>`;

            data.records.forEach((record) => {
              // load result to dom
              ui.loadReportContent(output, record, contents);
            });

            // clear search result
            ui.clearSearchResult(contents);

            listFunc.classList.remove("view");
          }
        });
    } else {
      ui.alert(
        "please enter year to search",
        "alert__danger",
        queryContain,
        adminReport
      );

      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  }

  if (e.target.classList.contains("yearMonth")) {
    const reportYear = document.querySelector(".reportYear"),
      reportMonth = document.querySelector(".reportMonth");
    if (reportYear.value !== "" && reportMonth.value !== "") {
      records
        .getRecordByMonthAndYear(
          `/api/v1/records/month&year/${reportMonth.value}/${reportYear.value}`
        )
        .then((data) => {
          if (data.status === "fail") {
            ui.alert(data.message, "alert__danger", queryContain, adminReport);

            setTimeout(() => {
              document.querySelector(".alert").remove();
            }, 3000);
          } else {
            let output = "";
            contents.innerHTML = `<div class="admin__reports-title stickyTitle">
              <h3>Report ID</h3>
              <h3>Lives affected</h3>
              <h3>cause of diaster</h3>
              <h3>location</h3>
              <h3>Date</h3>
        </div>`;

            data.records.forEach((record) => {
              // load result to dom
              ui.loadReportContent(output, record, contents);
            });

            // clear search result
            ui.clearSearchResult(contents);

            listFunc.classList.remove("view");
          }
        });
    } else {
      ui.alert(
        "please enter month and year to search",
        "alert__danger",
        queryContain,
        adminReport
      );

      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  }

  if (e.target.classList.contains("id")) {
    const reportId = document.querySelector(".reportID");
    if (reportId.value !== "") {
      records
        .getRecordById(`/api/v1/records/${reportId.value}`)
        .then((data) => {
          if (data.status === "fail") {
            ui.alert(data.message, "alert__danger", queryContain, adminReport);

            setTimeout(() => {
              document.querySelector(".alert").remove();
            }, 3000);
          } else {
            let output = "";
            contents.innerHTML = `<div class="admin__reports-title stickyTitle">
                          <h3>Report ID</h3>
                          <h3>Lives affected</h3>
                          <h3>cause of diaster</h3>
                          <h3>location</h3>
                          <h3>Date</h3>
                        </div>
        `;

            // load result to dom
            ui.loadReportContent(output, data.record, contents);

            // clear search result
            ui.clearSearchResult(contents);

            listFunc.classList.remove("view");
          }
        });
    } else {
      ui.alert(
        "please enter id number to search",
        "alert__danger",
        queryContain,
        adminReport
      );

      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    }
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

// search event
let flip = false;
search.addEventListener("mouseenter", (e) => {
  if (!flip) {
    listFunc.classList.add("view");
    flip = true;
  } else {
    listFunc.classList.remove("view");
    flip = false;
  }
});

//Search by month and year insert to dom
searchMonthYear.addEventListener("click", (e) => {
  if (document.querySelector(".query"))
    document.querySelector(".query").remove();

  const output = `
          <input
            list="months"
            class="reportMonth"
            id="month"
            placeholder="month"
          />
          <datalist id="months" class="dl_months">
            <!-- <option value="January"> -->
          </datalist>
          <input list="years" class="reportYear" placeholder="year" />
          <datalist id="years" class="dl_years">
            <!-- < value="2021"> -->
          </datalist>
          <button type="submit" class="searchRecords yearMonth btn--outline-orange">
            Search Records
          </button>
  `;

  const container = document.createElement("div");
  container.className = "container";
  container.innerHTML = output;
  const div = document.createElement("div");
  div.className = "query";
  div.append(container);

  queryContain.append(div);
  // adminReport.insertBefore(div, contents);

  const r_months = document.querySelector(".dl_months"),
    dl_years = document.querySelector(".dl_years");

  ui.datalistMonth(months, r_months);
  ui.datalistYear(dl_years);
});

// search by year insert into dom
searchYear.addEventListener("click", (e) => {
  if (document.querySelector(".query"))
    document.querySelector(".query").remove();

  const output = `
        <input list="years" class="reportYear" placeholder="year" />
          <datalist id="years" class="dl_years">
            <option value="2021"></option>
          </datalist>

          <button type="submit" class="searchRecords yearly btn--outline-orange">
            Search Records
          </button>
  `;

  const container = document.createElement("div");
  container.className = "container";
  container.innerHTML = output;
  const div = document.createElement("div");
  div.className = "query";
  div.append(container);

  queryContain.append(div);

  dl_years = document.querySelector(".dl_years");

  ui.datalistYear(dl_years);
});

// search by id insert into dom
searchId.addEventListener("click", (e) => {
  if (document.querySelector(".query"))
    document.querySelector(".query").remove();

  const output = `<input
                type="text"
                class="reportID"
                placeholder="Enter report number"
              />

              <button type="submit" class="searchRecords id btn--outline-orange">
                Search Records
              </button>`;

  const container = document.createElement("div");
  container.className = "container";
  container.innerHTML = output;
  const div = document.createElement("div");
  div.className = "query";
  div.append(container);

  queryContain.append(div);
});
