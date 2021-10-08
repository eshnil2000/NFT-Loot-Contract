# NFT-Loot-Contract
** contract address on benchnet 0xc2610a7F1CBA35F8Bc6Aaf910e42A48ed175804c
```
npm install
//create .env file with private keys, API
npx hardhat compile
npx hardhat test --network benchnet
npx hardhat run scripts/claim.js --network benchnet
npx hardhat run scripts/view.js --network benchnet

//jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:5002", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'
//jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'
//jsipfs daemon
```
