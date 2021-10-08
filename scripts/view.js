//contract address on benchnet 0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c
//npm install
//create .env file with private keys, API
//install hardhat
//npx hardhat compile
//npx hardhat test --network benchnet
//npx hardhat run scripts/claim.js --network benchnet
//npx hardhat run scripts/view.js --network benchnet
var contractAddress = '0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c'
contractAddress= '0xaF4558360cDBe01a813d8dfbfEda0c77e4396dAd'
contractAddress='0x986Db5289B69230b845a957679D97FE8929090B8' //rinkeby

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { expect } = require("chai");
var fs = require('fs');

//////
var API_URL = process.env.API_URL //benchnet
API_URL = process.env.INFURA_URL //rinkeby
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const PUBLIC_KEY = process.env.PUBLIC_KEY;

const PRIVATE_KEY = process.env.MY_PRIVATE_KEY;
const MY_PRIVATE_KEY1=process.env.MY_PRIVATE_KEY1
const MY_PUBLIC_KEY1=process.env.MY_PUBLIC_KEY1

const RINKEBY_PUBLIC_KEY= process.env.RINKEBY_PUBLIC_KEY
const RINKEBY_PRIVATE_KEY= process.env.RINKEBY_PRIVATE_KEY

const contract = require("../artifacts/contracts/Token.sol/Gear.json");
const { base64 } = require('ethers/lib/utils');

//console.log("contractct @ ", contractAddress)
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
console.log("transaction count"+ ( nftContract.defaultBlock))
/*nftContract.methods.tokenURI(1).call({from: PUBLIC_KEY}, function(error, result){
    console.log(result)
}); */



async function viewNFT(tokenId,pub_key) {
    var account_token= await nftContract.methods.balanceOf(pub_key).call();
    console.log("balance of " +pub_key + " is "+ account_token)
    //const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    //console.log("nonce" + nonce)
    console.log("tokenId" + tokenId)

    //nftContract.methods.tokenURI(tokenId).call({from: PUBLIC_KEY}, function(error, result){
    nftContract.methods.getTokenURI(tokenId).call({from: PUBLIC_KEY}, function(error, result){
        console.log(result)
        /* let base64String = result;
        let base64Image = base64String.split(';base64,').pop();
        console.log(base64Image.name,base64Image.description,base64Image.image)
            console.log('File created');
            
            const decodedRequestBodyString= Buffer.from(base64Image,"base64")
            const requestBodyObject = JSON.parse(decodedRequestBodyString);
            console.log(requestBodyObject)

            var index= '<!DOCTYPE html><html><body><img src="'+requestBodyObject.image+
            '" /></body></html>'
            var filename= './output/index'+tokenId+'.html'
            var txtfilename= './output/index'+tokenId+'.json'
            fs.writeFile(filename,index, function(err){
                console.log(filename , "created")
            })

            fs.writeFile(txtfilename,JSON.stringify(requestBodyObject), function(err) {
                console.log(txtfilename, "ceated")
            }) */


        })
        

}
var no_of_NFTs=2
for (let i = 0; i < no_of_NFTs; i++) {
    var image= viewNFT(i,RINKEBY_PUBLIC_KEY)
    //console.log(image)
}
