const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile.js");

// an instance of web3 constructor
const web3 = new Web3(ganache.provider());

let accounts;
let indxDepContract;
const INITIAL_MESSAGE = "Hi there !";

beforeEach(async () => {
  // get accounts from ganache
  accounts = await web3.eth.getAccounts();

  // use one acoount to deploy contract

  indxDepContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys the contract", () => {
    // if its a truthy value it passes
    // if its a falsy value it fails
    assert.ok(indxDepContract.options.address);
  });

  it("has a default message", async () => {
    const message = await indxDepContract.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);

    // console.log(message);
  });

  it("can update the message", async () => {
    await indxDepContract.methods.setMessage("bye").send({ from: accounts[1] });
    const message = await indxDepContract.methods.message().call();

    assert.equal(message, "bye");
  });
});
