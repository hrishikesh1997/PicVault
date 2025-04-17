const axios = require("axios")

const axiosinstance = axios.create({

    baseURL:process.env.UNSPLASH_ACCESS_URL,
    headers:{
        "Content-Type":"application/json",
       /*  CLIENT_KEY:process.env.UNSPLASH_ACCESS_KEY,
        CLIENT_SECRET:process.env.UNSPLASH_CLIENT_SECRET, */
       // CLIENT_ID:process.env.UNSPLASH_ACCESS_KEY

    }
})


module.exports = axiosinstance