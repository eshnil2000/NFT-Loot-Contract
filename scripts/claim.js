//contract address on benchnet 0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c
//npx hardhat test --network benchnet
const contractAddress = '0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c'

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { expect } = require("chai");
//////
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/Token.sol/Gear.json")
//console.log(JSON.stringify(contract.abi))

//const contractAddress = '0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c'
//console.log("contractct @ ", contractAddress)
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.MY_PRIVATE_KEY;
//////

async function mintNFT(tokenId) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    console.log("nonce" + nonce)
    console.log("tokenId" + tokenId)
  //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.claim(tokenId).encodeABI()
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}


var no_of_NFTs=3
var i=1

var myVar = setInterval(myTimer, 5000);

function myTimer() {
  if(i>no_of_NFTs){
    myStopFunction()
  }
  else{
    var image= mintNFT(i)
    i=i+1
  }
}

function myStopFunction() {
  clearInterval(myVar);
}

/*for (let i = 1; i < no_of_NFTs; i++) {
    var image= mintNFT(i)
}*/
