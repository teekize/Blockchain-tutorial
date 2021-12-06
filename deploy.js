let rinkbyUrl = "https://rinkeby.infura.io/v3/58fee1e83ec644c58f6dcc5b729cdf56";

const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const Web3 = require("web3");
const { interface, bytecode } = require("./compile.js");

const provider = new HDWalletProvider(process.env.MNEUMONIC, rinkbyUrl);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("attempting to deploy from account", accounts[0]);

  const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there !"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed at address : ", results.options.address);
  provider.engine.stop();
};

deploy();
