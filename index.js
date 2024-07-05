const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
//const session = require('express-session')
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use("/", require("./routers/block_chain"));

app.use((req, res) => {
    res.json({ code: 2, message: "Path is not supported" });
});

const PORT = process.env.PORT || 3000;
const LINK = process.env.URL || "http://localhost:" + PORT;

app.listen(PORT, () => {
    console.log(LINK);
});