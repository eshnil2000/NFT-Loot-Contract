require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const { MY_PRIVATE_KEY,MY_PRIVATE_KEY1,MY_PRIVATE_KEY2 } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    benchnet: {
      url: `https://benchnet.dappsuni.com/`,
      accounts: [`${MY_PRIVATE_KEY}`,`${MY_PRIVATE_KEY1}`,`${MY_PRIVATE_KEY2}`],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
            enabled: true,
            runs: 200
          },
          evmVersion: "constantinople"
         }
      },
      {
        version: "0.6.7",
        settings: {},
      },
      
    ],
  },
};
