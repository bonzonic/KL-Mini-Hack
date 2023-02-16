var simpleContract = artifacts.require("CabbageCoin");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(simpleContract);
  const instance = await simpleContract.deployed();
  // Additional contracts can be deployed here
};
