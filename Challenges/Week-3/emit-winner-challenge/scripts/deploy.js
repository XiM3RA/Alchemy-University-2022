const hre = require("hardhat");

async function main() {
    const Winner = await hre.ethers.getContractFactory("Winner");
    const winner = await Winner.deploy("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502");

    await winner.deployed();

    console.log("winner contract deployed to:", winner.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
