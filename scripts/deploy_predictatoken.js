
const hre = require("hardhat");

async function main() {


  const PREDICTATOKEN = await hre.ethers.getContractFactory("PredictaToken");
  const predictatoken = await PREDICTATOKEN.deploy();

  await predictatoken.deployed();

  console.log(
   `Predicta ERC20 Token contract deployed with address: ${predictatoken.address}`
   ); 


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
