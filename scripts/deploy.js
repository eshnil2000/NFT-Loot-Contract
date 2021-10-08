//Before deploying, setup
//https://hardhat.org/tutorial/setting-up-the-environment.html
//nvm install v14.17.5 -g
//nvm alias default 14.17.5
//npm install -g ipfs
//jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:5002", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'
//jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'
//jsipfs daemon
//Make sure you browse to http://127.0.0.1:5002/webui NOT LOCALHOST
//upload image or other NFT via: jsipfs add ./hello-world.txt or through the console
//get the URI and update URI @ scripts/mint-nft.js
//npx hardhat compile
//npx hardhat run scripts/deploy.js --network benchnet
//grab the contract address to modify in the following 2 scripts
//node scripts/mint-nft.js
//node scripts/view-token-uri.js

async function main() {
  const MyNFT = await ethers.getContractFactory("Gear")

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
