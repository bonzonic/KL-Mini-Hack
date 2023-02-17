const fs = require('fs');

const VotingEvent = artifacts.require("VotingEvent");
const Hasher = artifacts.require("Hasher");

module.exports = async function (deployer, network, accounts) {
  // const owners = accounts.slice(0, 1);

  const hashser = await deployer.deploy(Hasher);

  await deployer.deploy(VotingEvent, accounts[0], Hasher.address);

  const data = {
    VotingEventAddr: VotingEvent.address
  }

  fs.writeFileSync('./contractAddr.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
};
