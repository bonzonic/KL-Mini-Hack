const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const web3 = require("web3");
const contract = require("@truffle/contract");
const provider = new web3.providers.HttpProvider("http://127.0.0.1:9545");
const Web3 = new web3(provider);

app.use(cors({ origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"] }));

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5173",
    ],
  })
);

// Stores as key(email): value(password)
const user_database = {}
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

const getCabbageContractAddr = async () => {
  const cabbageCoinArtifact = require("../truffle-project/build/contracts/CabbageCoin.json");
  const CabbageCoin = contract(cabbageCoinArtifact);
  CabbageCoin.setProvider(provider);
  const addr = require("../truffle-project/contractAddr.json").CabbageCoinAddr;
  const instance = await CabbageCoin.at(addr);
  return instance;
};

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
    } else {
      res.status(401).send("Invalid email or password");
    }
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.post("/api/vote/send-coin", async (req, res) => {
  const walletAddress = req.body.walletAddress;
  const cabbageCoin = await getCabbageContractAddr();
  await cabbageCoin.mint(walletAddress, 1, {
    from: walletAddress,
  }); 

  const coinAccount = await cabbageCoin.getBalance(
    walletAddress 
  );
  console.log(coinAccount.words[0]);
  res.status(204);
});

app.get("/user/get-coin", async (req, res) => {
  const walletAddress = req.query.walletAddress;
  const cabbageCoin = await getCabbageContractAddr();
  const coin = await cabbageCoin.getBalance(walletAddress);
  res.status(200).send({ coins: coin.words[0] });
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

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
