require("dotenv").config();

let rinkbyUrl = process.env.RINKEBY;

const HDWalletProvider = require("@truffle/hdwallet-provider");

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
