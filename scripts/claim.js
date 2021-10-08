//contract address on benchnet 0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c
//npx hardhat test --network benchnet
var contractAddress = '0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c'
contractAddress= '0xaF4558360cDBe01a813d8dfbfEda0c77e4396dAd' //benchnet
contractAddress= '0x986Db5289B69230b845a957679D97FE8929090B8' //rinkeby
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { expect } = require("chai");
//////
var API_URL = process.env.API_URL //benchnet
API_URL = process.env.INFURA_URL

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/Token.sol/Gear.json")

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.MY_PRIVATE_KEY;
const MY_PRIVATE_KEY1=process.env.MY_PRIVATE_KEY1
const MY_PUBLIC_KEY1=process.env.MY_PUBLIC_KEY1
const RINKEBY_PUBLIC_KEY= process.env.RINKEBY_PUBLIC_KEY
const RINKEBY_PRIVATE_KEY= process.env.RINKEBY_PRIVATE_KEY
//////
//const {pinJSONToIPFS} = require('./ipfs')
const ipfsClient = require('ipfs-http-client');

var ipfs = ipfsClient.create('http://127.0.0.1:5002');

const addFile = async ({ path, content }) => {
  const file = { path: path, content: Buffer.from(content) };
  const filesAdded = await ipfs.add(file);
  return filesAdded[0].hash;
}

async function mintNFT(tokenId,priv_key,pub_key) {
  nftContract.methods.tokenURI(tokenId).call({from: pub_key}, async function(error, result){
    if(error){
      console.log("error "+error)
    }
    let base64String = result;
    console.log("base64String "+ base64String)
    let base64Image = base64String.split(';base64,').pop();
    console.log("base64Image "+ base64Image)
    const decodedRequestBodyString= Buffer.from(base64Image,"base64")
    const requestBodyObject = JSON.parse(decodedRequestBodyString);
    /* const ipfsResponse = await pinJSONToIPFS(requestBodyObject);
            console.log("ipfsResponse is" +  JSON.stringify(ipfsResponse))
            if (!ipfsResponse.ipfsUrl) {
                return {
                    success: false,
                    status: "😢 Something went wrong while uploading your tokenURI.",
                }
              } */
    var ipfsResponse = await ipfs.add(JSON.stringify(requestBodyObject));
    //console.log(ipfsResponse)
  
  //var uri_string= "https://ipfs.io/ipfs/"+ ipfsResponse.ipfsUrl;
  var uri_string= "https://ipfs.io/ipfs/"+ ipfsResponse.path;
  console.log(uri_string)
    const nonce = await web3.eth.getTransactionCount(pub_key, 'pending'); //get latest nonce
    console.log("nonce" + nonce)
    console.log("tokenId" + tokenId)
  //the transaction
    const tx = {
      'from': pub_key,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.claim(tokenId,uri_string).encodeABI()
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, priv_key);

    signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "Token#"+ tokenId+ " minted, The hash of your transaction is: ",
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

  })


}


var no_of_NFTs=5
var i=0

var myVar = setInterval(myTimer, 5000);

function myTimer() {
  if(i>no_of_NFTs){
    myStopFunction()
  }
  else{
    //var image= mintNFT(i,MY_PRIVATE_KEY1,MY_PUBLIC_KEY1)
    var image= mintNFT(i,RINKEBY_PRIVATE_KEY,RINKEBY_PUBLIC_KEY)
    i=i+1
  }
}

function myStopFunction() {
  clearInterval(myVar);
}

/*for (let i = 1; i < no_of_NFTs; i++) {
    var image= mintNFT(i)
}*/
