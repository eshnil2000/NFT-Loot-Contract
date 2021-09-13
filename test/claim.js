//contract address on benchnet 0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c
//npx hardhat test --network benchnet
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { expect } = require("chai");
//////
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/Token.sol/Gear.json")
console.log(JSON.stringify(contract.abi))

const contractAddress = '0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c'
//console.log("contractct @ ", contractAddress)
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.MY_PRIVATE_KEY;
//////

describe("Token contract claim", function () {
  it("Deployment should claim 1 token", async function () {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    console.log("nonce" + nonce)
  //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.claim(1).encodeABI()
    };
  });
});