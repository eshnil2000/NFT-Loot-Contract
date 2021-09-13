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

//const contractAddress = process.env.NFT_CONTRACT_ADDRESS
//console.log("contractct @ ", contractAddress)
//const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.MY_PRIVATE_KEY;
//////

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Gear");
    //console.log(JSON.stringify(Token))

    const hardhatToken = await Token.deploy();
    console.log("USE THIS CONTRACT ADDRESS IN SCRIPTS:" +hardhatToken.address)
    const contractAddress=hardhatToken.address
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});