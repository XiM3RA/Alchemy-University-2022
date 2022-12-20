require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
      goerlie: {
          url: process.env.GOERLI_URL,
          accounts: [process.env.PRIVATE_KEY]
      }
  }
};
