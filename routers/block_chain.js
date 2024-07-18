const express = require('express')
const Router = express.Router()

const Controller = require("../controllers/block_chain")
const { upload, uploadMultiple } = require('../middlewares/multer')

Router.get("/", Controller.get_all)

Router.get("/:category/:id", Controller.get_detail)

Router.post("/updateView/:id", Controller.updateView)

Router.post("/updateShare/:id", Controller.updateShare)

Router.get("/:category", Controller.getCategory)

Router.post("/comment/:topicId", upload ,Controller.addComment)

Router.post("/login", Controller.postLogin)

Router.post("/register", upload ,Controller.postRegister)

Router.post("/forgotpassword", upload ,Controller.postForgotPassword)

Router.post("/account/changeInformation", upload ,Controller.changeInformation)

Router.post("/account/changePassword" ,Controller.changePassword)

module.exports = Router