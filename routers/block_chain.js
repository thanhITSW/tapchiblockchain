const express = require('express')
const Router = express.Router()

const Controller = require("../controllers/block_chain")

Router.get("/", Controller.get_all)

Router.get("/:id", Controller.get_detail)

Router.post("/updateView/:id", Controller.updateView)

Router.get("/category/:category", Controller.getCategory)

module.exports = Router