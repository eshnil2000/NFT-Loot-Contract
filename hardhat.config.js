require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const { MY_PRIVATE_KEY,MY_PRIVATE_KEY1,MY_PRIVATE_KEY2,INFURA_KEY,RINKEBY_PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    benchnet: {
      url: `https://benchnet.dappsuni.com/`,
      accounts: [`${MY_PRIVATE_KEY}`,`${MY_PRIVATE_KEY1}`,`${MY_PRIVATE_KEY2}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/`+`${INFURA_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
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
