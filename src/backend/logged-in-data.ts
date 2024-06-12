class DataStore {
    hospitalNameLogin: string;

    constructor() {
      this.hospitalNameLogin = "IntelliHosp";
    }

    setHospitalName(name) {
      this.hospitalNameLogin = name;
    }

    getHospitalName() {
      return this.hospitalNameLogin;
    }
  }

  const loggedInData = new DataStore();
  export default loggedInData;
