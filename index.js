const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const session = require('cookie-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const flash = require('express-flash')

const app = express()

app.use(cookieParser('vds'));
app.use(session({ cookie: { maxAge: 12000000 } })); //2h
app.use(flash());

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