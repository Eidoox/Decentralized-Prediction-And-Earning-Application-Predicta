
const hre = require("hardhat");

async function main() {


    const predictatokenaddress = "0x021Fd8D5CE323D33Af56F3A3c92733C7b5AC468F";
    const NFTSUBSCRIPTIONPLANS = await hre.ethers.getContractFactory("NFTSubscriptionPlans");
    const nftsubscriptionplans = await NFTSUBSCRIPTIONPLANS.deploy("Basic","Intermediate","Premium",predictatokenaddress);

    await nftsubscriptionplans.deployed();

    console.log(
    ` NFT Subscription plans contract deployed with address: ${nftsubscriptionplans.address}`
    ); 


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
