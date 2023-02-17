const fs = require('fs');

const VotingEvent = artifacts.require("VotingEvent");
const Hasher = artifacts.require("Hasher");
const simpleContract = artifacts.require("CabbageCoin");

module.exports = async function (deployer, network, accounts) {
  // const owners = accounts.slice(0, 1);

  const hashser = deployer.deploy(Hasher);

  // voting
  await deployer.deploy(VotingEvent, accounts[0], Hasher.address);

  // cabbage coin
  await deployer.deploy(simpleContract);
  await simpleContract.deployed();
  const data = {
    VotingEventAddr: VotingEvent.address,
    CabbageCoinAddr: simpleContract.address
  }

  fs.writeFileSync('contractAddr.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
};
