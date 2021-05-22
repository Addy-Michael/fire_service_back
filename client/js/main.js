let data;

class Records {
  async getAllRecords(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getTopFourRecords(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getRecordById(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getRecordByMonth(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getRecordByYear(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getRecordByMonthAndYear(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async addRecord(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  async editRecord(url, data) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  async deleteRecord(url) {
    await fetch(url, { method: "DELETE" });
  }
}

class Users {
  async getUser(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getUsers(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async getLatestUsers(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async registerUser(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  async updateUser(url, data) {
    const response = await fetch(url, {
      method: "PATCH",
      body: data,
    });
    const resData = await response.json();
    return resData;
  }

  async deleteUser(url) {
    await fetch(url, {
      method: "DELETE",
    });
  }
}

class Auth {
  async login(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      return resData;
    } catch (error) {
      return error;
    }
  }

  async logout(url) {
    try {
      const response = await fetch(url);

      const resData = await response.json();

      return resData;
    } catch (error) {
      return error;
    }
  }
}

class UI {
  loadDateValuesToDom(input, domOutput) {
    let output;
    input.forEach((val) => {
      output += `<option value=${val}>${val}</option>`;
    });
    domOutput.innerHTML = output;
  }

  loadYearToDom(domOutput) {
    let yr = new Date().getFullYear();
    let output;
    do {
      output += `<option value=${yr}>${yr}</option>`;
      yr--;
    } while (yr != 1999);
    domOutput.innerHTML = output;
  }

  loadDateToDom(domOutput) {
    let date = 1;
    let output;
    do {
      output += `<option value=${date}>${date}</option>`;
      date++;
    } while (date != 32);
    domOutput.innerHTML = output;
  }

  datalistMonth(input, domOutput) {
    let output;
    input.forEach((val) => {
      output += `<option value=${val}>`;
    });
    domOutput.innerHTML = output;
  }

  datalistYear(domOutput) {
    let yr = new Date().getFullYear();
    let output;
    do {
      output += `<option value=${yr}>`;
      yr--;
    } while (yr != 1999);
    domOutput.innerHTML = output;
  }

  //   load records contents to dom
  loadReportContent(output, record, insertContent) {
    const div = document.createElement("div");
    div.className = "admin__reports-view";
    output = `
                      <div class="admin__reports-view--num reportId">
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
                          ${record.dayNum} - ${record.month} - ${record.year}
                      </div>
                      <div class="admin__reports-view--operations">
                          <i class="fas fa-eye"></i>
                          <i class="fas fa-edit"></i>
                          <i class="fas fa-trash-alt delReport"></i>
                      </div>
                  `;
    div.innerHTML = output;
    insertContent.appendChild(div);
  }

  // Load users to dom
  loadUserContent(output, user, insertContent) {
    const div = document.createElement("div");
    let date = new Date(user.dob).toISOString();
    div.className = "admin__staffs-view ";
    output = `
              <div class="admin__staffs-view--img">
                <img src="/img/users/${user.photo}"/>
              </div>
              <div class="admin__staffs-view--userID uid">${user.staffID}</div>
              <div class="admin__staffs-view--fName">${user.firstname}</div>
              <div class="admin__staffs-view--lname">${user.surname}</div>
              <div class="admin__staffs-view--gen">${user.gender}</div>
              <div class="admin__staffs-view--email">${user.email}</div>
              <div class="admin__staffs-view--contact">${user.contact}</div>
              <div class="admin__staffs-view--DOB">${date}</div>
              <div class="admin__staffs-view--operations">
                <i class="fas fa-trash-alt delUser"></i>
              </div>
            `;
    div.innerHTML = output;
    insertContent.appendChild(div);
  }

  // load alert
  alert(msg, classname, output, parent) {
    const div = document.createElement("div");
    div.className = `alert ${classname}`;
    const p = `<p class="alert__output">${msg}</p>`;
    div.innerHTML = p;
    parent.insertBefore(div, output);
  }

  // clear search result
  clearSearchResult(output) {
    const div = document.createElement("div");
    div.className = "clear";
    div.innerHTML = `<a href="/reports.html" class="clear__btn">Clear</a>`;
    output.append(div);
  }

  // clear user Resul
  clearUserResult(output) {
    const div = document.createElement("div");
    div.className = "clear";
    div.innerHTML = `<a href="/reports.html" class="clear__btn">Clear</a>`;
    output.append(div);
  }
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ui = new UI();
const records = new Records();
const auth = new Auth();
const user = new Users();
