const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer')

app.use(cors({origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"]}));

// Stores as key(email): [value(password), []]
const user_database = {}
//const user_database = {"euanlim@gmail.com":["password", []]}

// Parse JSON and x-www-form-urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().array())

app.get('/', (req, res) => {
    res.send("Server is Running")
})

// Get users
app.get('/user', (req, res) => {
    res.send(JSON.stringify(user_database))
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

app.post('/user/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    
    if (user_database.hasOwnProperty(email)) {
        console.log("Already Registerd")
    }
    else { 
        user_database[email] = [password]
        console.log(`Adding email: ${email} and password: ${password} in` + JSON.stringify(user_database))
    }
    res.status(200).send('Registration successful!');
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})