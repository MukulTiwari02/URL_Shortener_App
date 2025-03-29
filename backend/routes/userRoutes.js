const express = require("express")
const {registerUser, logoutUser, loginStatus, loginUser, getUser, updateUser, changePassword} = require("../controllers/userControllers")
const protect = require("../middleware/authenticateUser");

const router = express.Router();


router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/loginStatus", loginStatus);
router.post("/login", loginUser);
router.get("/getUser",protect, getUser);
router.patch("/updateUser",protect, updateUser);
router.patch("/changePassword",protect, changePassword);

module.exports = router