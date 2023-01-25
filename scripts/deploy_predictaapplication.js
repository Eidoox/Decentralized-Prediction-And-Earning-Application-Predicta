
const hre = require("hardhat");

async function main() {

    const predictatokenaddress = "0x021Fd8D5CE323D33Af56F3A3c92733C7b5AC468F";
    const nftsubscriptionplansaddress = "0x770dA8cdD24406cA79b8BD6845fA08fF5c181C0F";

    const PREDCITA = await hre.ethers.getContractFactory("Predicta");
    const predicta = await PREDCITA.deploy(nftsubscriptionplansaddress,predictatokenaddress);

    await predicta.deployed();

    console.log(
    ` Predicta application contract deployed with address: ${predicta.address}`
    ); 


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
