const URL = require("../models/urlModel")
const nanoid = require("nanoid")


const addNewURL = async (req,res) => {
    try {
        // Check if URL is already associated with user
        const user = req.user
        let urlExists = await URL.findOne({userId : user._id,longURL : req.body.longURL});

        if(urlExists)   res.json({message : "URL already associated with user", ShortURL : urlExists.shortURL})
        else {

            let longURL = req.body.longURL
            longURL = longURL.replace("https://","");

            const shortURL = nanoid(10)

            const userId = user._id

            const newURL = await URL.create(
                {
                    userId : userId,
                    longURL: longURL,
                    shortURL: shortURL
                }
            )

            res.json({ShortURL : newURL.shortURL});  
        }

    } catch (error) {
        res.status(400).json({
            message : error.message,
            stack : error.stack
        })
    }
}

const redirectToURL = async (req,res) => {
    try {
        const currURL = req.params.shortURL;
        const url = await URL.findOne({shortURL : currURL})
        if(!url){             
            throw new Error("404 - No page found associated With this url")
        }
        
        else{
            url.clickCount = url.clickCount + 1;
            await url.save();
            res.redirect(`https://${url.longURL}`)
        }
 
    } catch (error) { 
        res.status(400).json(error.message) 
    } 
}

module.exports = {
    addNewURL, redirectToURL 
}
  