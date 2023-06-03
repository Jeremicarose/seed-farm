const http = require("http");
const https = require("https");

module.exports = {
  resolve: {
    fallback: {
      "http": http,
      "https": https,
    },
  },
};
