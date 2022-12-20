// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const ethers = require('ethers');
require('dotenv').config();

async function main() {
    const url = process.env.GOERLI_URL;
    let artifacts = await hre.artifacts.readArtifact("Faucet");
    const provider = new ethers.providers.JsonRpcProvider(url);
    let privateKey = process.env.PRIVATE_KEY;
    let wallet = new ethers.Wallet(privateKey, provider);

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

    let faucet = await factory.deploy();

    console.log("Faucet address:", faucet.address);

    await faucet.deployed();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
