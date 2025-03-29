const bcrypt = require("bcryptjs")

const passwordEncryptor = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        console.log(error.message)
        return "";
    }   
}


module.exports = passwordEncryptor;