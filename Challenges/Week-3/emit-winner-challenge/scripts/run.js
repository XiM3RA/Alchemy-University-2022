const hre = require("hardhat");
const abi = require("../Artifacts/contracts/Winner.sol/Winner.json");
require("dotenv").config()

async function main() {
    const contractAddress = "0xc9ed29F0746cd273C1f9d3715138D5f38018d465";

    const contractABI = abi.abi;

    const provider = new hre.ethers.providers.AlchemyProvider(
        "goerli",
        process.env.GOERLI_API_KEY
    );
    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const Winner = new hre.ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    await Winner.win();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
