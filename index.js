const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;
require("dotenv").config();

let corsOptions = {
  origin: ["http://localhost:3000", "https://humanscape-team5a.netlify.app"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  const textQuery = req.query.searchText;
  const numOfRowsQuery = req.query.numOfRows;
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  axios
    .get(
      "http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList",
      {
        params: {
          SearchKey: process.env.API_KEY,
          sickType: 1,
          medTp: 2,
          diseaseType: "SICK_NM",
          searchText: textQuery,
          numOfRows: numOfRowsQuery,
          _type: "json",
        },
      }
    )
    .then(response => res.send(response.data));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
