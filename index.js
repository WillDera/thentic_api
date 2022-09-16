const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const open = require("open");
const jsonParser = bodyParser.json();
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.post("/create_nft", jsonParser, async (req, res) => {
  const user_req = req.body;

  const data = {
    key: process.env.API_KEY,
    chain_id: Number(process.env.CHAIN_ID),
    name: user_req.name,
    short_name: user_req.short_name,
  };

  // set up api options
  const options = {
    method: "POST",
    url: "https://thentic.p.rapidapi.com/nfts/contract",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RapidAPI_Key,
      "X-RapidAPI-Host": process.env.RapidAPI_Host,
    },
    data,
  };

  await axios
    .request(options)
    .then(async function (response) {
      console.log(response.data);
      await open(response.data.transaction_url);
      res.status(200);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.post("/mint_nft", jsonParser, async (req, res) => {
  const user_req = req.body;

  const data = {
    key: process.env.API_KEY,
    chain_id: Number(process.env.CHAIN_ID),
    contract: process.env.NFT_Contract,
    nft_id: user_req.id,
    nft_data: user_req.shortInfo,
    to: user_req.to,
  };

  const options = {
    method: "POST",
    url: "https://thentic.p.rapidapi.com/nfts/mint",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RapidAPI_Key,
      "X-RapidAPI-Host": process.env.RapidAPI_Host,
    },
    data,
  };

  await axios
    .request(options)
    .then(async function (response) {
      console.log(response.data);
      await open(response.data.transaction_url);
      res.status(200);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(3000, () => {
  console.log("server started");
});
