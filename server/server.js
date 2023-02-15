const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer')

app.use(cors({origin:"http://127.0.0.1:5173"}));

// Stores as key(email): value(password)
const user_database = {}

// Parse JSON and x-www-form-urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().array())

app.get('/', (req, res) => {
    res.send("Server is Running")
})

app.get('/user', (req, res) => {
    res.send(JSON.stringify(user_database))
})

app.post('/user/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT POST")
    const email = req.body.email;
    const password = req.body.password
    
    if (user_database.hasOwnProperty(email)) {
        console.log("Already Registerd")
    }
    else { 
        user_database[email] = password
        console.log(`Adding email: ${email} and password: ${password} in` + JSON.stringify(user_database))
        res.status(200).send('Registration successful!');
    }
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})