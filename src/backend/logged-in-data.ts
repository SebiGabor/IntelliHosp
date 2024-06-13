class DataStore {
    hospitalNameLogin: string;
    hospitalIDLogin: number;

    constructor() {
      this.hospitalNameLogin = "IntelliHosp";
      this.hospitalIDLogin = 0;
    }

    setHospitalName(name) {
      this.hospitalNameLogin = name;
    }

    getHospitalName() {
      return this.hospitalNameLogin;
    }

    setHospitalID(id) {
      this.hospitalIDLogin = id;
    }

    getHospitalID() {
      return this.hospitalIDLogin;
    }
  }

  const loggedInData = new DataStore();
  export default loggedInData;
