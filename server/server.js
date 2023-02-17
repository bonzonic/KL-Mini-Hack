const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("express");
const multer = require("multer");
const Web3 = require("web3");
const { generateCommitment } = require("zk-merkle-tree");

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5173",
      "http://127.0.0.1:9545/",
    ],
  })
);

// web3 instance and helpers ===================================================
const web3 = new Web3("http://127.0.0.1:9545/");
const ethAcc = {
  address: "0x4525478C535f6a452492b7134dfC440CeEa23D68",
  privateKey: "a2a8b8f0ac6783368b7910dc7a88ba00834bf13c38a6ad0fec31796d500a8133"
};

const getContractAddr = () => {
  return require("../truffle-project/contractAddr.json").VotingEventAddr;
}

const getAbi = (fileName) => {
  return require("../truffle-project/build/contracts/" + fileName).abi;
}

const callPaidFunction = async (contractAddress, contractMethod) => {
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: contractMethod.encodeABI(),
      gas: await contractMethod.estimateGas()
    }, 
    ethAcc.privateKey
  )

  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);

  return createReceipt
}

// Stores as key(email): [value(password), []]
const user_database = {};
//const user_database = {"euanlim@gmail.com":["password", []]}

// Parse JSON and x-www-form-urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().array());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

// Get users
app.get("/user", (req, res) => {
  res.send(JSON.stringify(user_database));
});

app.post("/user", (req, res) => {
  if (user_database.hasOwnProperty(req.body.email)) {
    res.status(200).send(JSON.stringify(user_database[req.body.email][1]));
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.post("/user/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (user_database.hasOwnProperty(email)) {
    if (user_database[email][0] === password) {
      res.status(200).send("Registration successful!");
    }
  }
  res.status(401).send("Invalid email or password");
});

app.post("/user/register", (req, res) => {
  // {email: [password, {username, etc}]}
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.Username;

  console.log(username);
  if (user_database.hasOwnProperty(email)) {
    console.log("Already Registerd");
  } else {
    user_database[email] = [password, { username: username }];
    console.log(
      `Adding email: ${email} and password: ${password} in` +
        JSON.stringify(user_database)
    );
  }
  res.status(200).send("Registration successful!");
});


// Voting Section ======================================================================================================

app.post("/zk/generateCommitment", async (req, res) => {
  res.status(200).send(await generateCommitment());
});

app.post("/zk/registerCommitment", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const participantManagerContract = new web3.eth.Contract(getAbi("ParticipantManager.json"), await votingEventContract.methods.getParticipantManager().call());
  
  const registerCommitment = participantManagerContract.methods.registerCommitment(req.body.uniqueHash, req.body.commitment);

  await callPaidFunction(await votingEventContract.methods.getParticipantManager().call(), registerCommitment);

  res.status(200).send("Success");
});

app.post("/zk/registerVote", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const participantManagerContract = new web3.eth.Contract(getAbi("ParticipantManager.json"), await votingEventContract.methods.getParticipantManager().call());

  const registerVote = participantManagerContract.methods.vote(req.body.candidate, req.body.nullifierHash, req.body.root, req.body.proofa, req.body.proofb, req.body.proofc);

  await callPaidFunction(await votingEventContract.methods.getParticipantManager().call(), registerVote);

  res.status(200).send("Success");
});

// Candidate Manipulation Section ================================================================================================

app.post("/zk/getCandidates", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const candidateManagerContract = new web3.eth.Contract(getAbi("CandidateManager.json"), await votingEventContract.methods.getCandidateManager().call());

  const result = await candidateManagerContract.methods.getCandidates().call();

  res.status(200).send(result);
});

app.post("/zk/addCandidate", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const candidateManagerContract = new web3.eth.Contract(getAbi("CandidateManager.json"), await votingEventContract.methods.getCandidateManager().call());

  const addCandidate = candidateManagerContract.methods.addCandidate(req.body.name);

  await callPaidFunction(await votingEventContract.methods.getCandidateManager().call(), addCandidate);

  res.status(200).send("Success");
});

app.post("/zk/removeCandidate", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const candidateManagerContract = new web3.eth.Contract(getAbi("CandidateManager.json"), await votingEventContract.methods.getCandidateManager().call());

  const removeCandidate = candidateManagerContract.methods.removeCandidate(req.body.name);

  await callPaidFunction(await votingEventContract.methods.getCandidateManager().call(), removeCandidate);

  res.status(200).send("Success")
})

app.post("/zk/clearCandidates", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const candidateManagerContract = new web3.eth.Contract(getAbi("CandidateManager.json"), await votingEventContract.methods.getCandidateManager().call());

  const clearCandidates = candidateManagerContract.methods.clearCandidates();

  await callPaidFunction(await votingEventContract.methods.getCandidateManager().call(), clearCandidates);

  res.status(200).send("Success")
})

app.post("/zk/checkCandidate", async (req, res) => {
  const votingEventContract = new web3.eth.Contract(getAbi("VotingEvent.json"), getContractAddr());
  const candidateManagerContract = new web3.eth.Contract(getAbi("CandidateManager.json"), await votingEventContract.methods.getCandidateManager().call());

  res.status(200).send(await candidateManagerContract.methods.isCandidateExist(req.body.name).call())
})


app.listen(8080, () => {
  console.log("Listening on port 8080");
});
