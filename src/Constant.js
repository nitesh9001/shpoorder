module.exports = {
  getAPI: function () {
    // return "https://waleedapp.herokuapp.com";
    return "http://204.48.26.50:7048/api";
  },
  getToken: function () {
    // return "https://waleedapp.herokuapp.com";
    return  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmOGI5Y2I3LWM2OGMtNGU0ZS05MjVmLTczZGY0NDMyNWE1YyIsImlhdCI6MTYwNzE2NDE5NDk0MH0.8XGXSII1IEw9HmntIUsEqMrHYkZX-PKBUPI1JzornEQ"
  },
  getDefaultCurrrency: function () {
    return "KWD";
  },
  getLanguageList: function () {
    var languages = [
      {
        id: "en",
        name: "English",
      },
      {
        id: "ar",
        name: "Arabic",
      },
    ];
    return languages;
  },
};
