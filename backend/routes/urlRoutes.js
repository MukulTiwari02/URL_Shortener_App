const express = require("express")
const { addNewURL, redirectToURL } = require("../controllers/urlControllers")
const router = express.Router()
const protect = require('../middleware/authenticateUser')

router.post("/addNewUrl",protect, addNewURL)
router.get("/:shortURL", redirectToURL)

module.exports = router