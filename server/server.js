const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const web3 = require("web3");
const contract = require("@truffle/contract");
const cabbageCoinArtifact = require("../truffle-project/build/contracts/MetaCoin.json");
const CabbageCoin = contract(cabbageCoinArtifact);

const provider = new web3.providers.HttpProvider("http://127.0.0.1:7545");
app.use(cors({ origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"] }));
CabbageCoin.setProvider(provider);

app.use(cors({origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://localhost:5173"]}));

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
app.post('/user', (req, res) => {
    if (user_database.hasOwnProperty(req.body.email)) {
        res.status(200).send(JSON.stringify(user_database[req.body.email][1]))
    }
    else {
        res.status(401).send('Invalid email or password')
    }
}) 

app.post('/user/login', (req,res) => {
    const email = req.body.email
    const password = req.body.password

    if (user_database.hasOwnProperty(email)) {
        if (user_database[email][0] === password) {
            res.status(200).send('Registration successful!');
        }
    }
    res.status(401).send('Invalid email or password')

})

app.post("/user/send", (req, res) => {
  console.log("hello!");
});

app.get("/user/getcoin", async (req, res) => {
  const accountOne = "0x14219D6985AC28EDd22c31B7229983BA32B3eC73";
  const accountTwo = "0x1104bFf999b40914c62F2987c5F6784d87c19091";
  const contractAddress = "0x0DD447feA3dEeFEac81A3a825FA60B43894Af286"; // contract address depending on which contract
  const instance = await CabbageCoin.at(contractAddress);
  try {
    const balance = await instance.getBalance(accountOne);
    console.log(balance.words[0]);

    // Make a transaction that calls the function `sendCoin`, sending 3 CabbageCoin
    // to the account listed as accountTwo.
    let result = await instance.sendCoin(accountTwo, 1000, { from: accountOne });
    // // This code block will not be executed until @truffle/contract has verified
    // // the transaction has been processed and it is included in a mined block.
    // // @truffle/contract will error if the transaction hasn't been processed in 120 seconds.

    // // Since we're using promises, we can return a promise for a call that will
    // // check account two's balance.
    // console.log("Balance of account two is " + balancerOfAccountTwo + "!"); // => 3

    // // But maybe too much was sent. Let's send some back.
    // // Like before, will create a transaction that returns a promise, where
    // // the callback won't be executed until the transaction has been processed.
    // result = await instance.sendCoin(accountOne, 1.5, { from: accountTwo });
    // balancerOfAccountTwo = await instance.balances.call(accountTwo);
    // console.log("Balance of account two is " + balancerOfAccountTwo + "!"); // => 1.5
  } catch (err) {
    // Easily catch all errors along the whole execution.
    console.log("ERROR! " + err.message);
  }
  res.status(200).send("meow");
});

app.post('/user/register', (req, res) => {
    // {email: [password, {username, etc}]}
    const email = req.body.email;
    const password = req.body.password
    const username = req.body.Username
    
    console.log(username)
    if (user_database.hasOwnProperty(email)) {
        console.log("Already Registerd")
    }
    else { 
        user_database[email] = [password, {"username": username}]
        console.log(`Adding email: ${email} and password: ${password} in` + JSON.stringify(user_database))
    }
    res.status(200).send('Registration successful!');
})

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
