const simpleContract = artifacts.require("CabbageCoin");
const fs = require("fs");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(simpleContract);
  const instance = await simpleContract.deployed();
  // Additional contracts can be deployed here

  const data = {
    CabbageCoinAddr: simpleContract.address,
  };

  fs.writeFileSync("contractAddr.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("data written to file!");
  });
};
