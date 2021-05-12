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

  async getRecordById(ur) {
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
    await fetch(url);
  }
}

class Users {
  async getUser(url) {
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
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
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
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const ui = new UI();
const records = new Records();
const auth = new Auth();
const user = new Users();
