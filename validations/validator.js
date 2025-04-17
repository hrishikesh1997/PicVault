const {User} = require("../models") 

function validateRequestBody(username, email) {
    if (!username || !email) { // Proper validation
        return false;
    }
    return true;
}



 function ValidateEmail(email){
 
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   
    
}

 async function doesuserExist(email){
     
    const newuser = await User.findOne({where : {email}})

    if(!newuser){
        return null;
    }

}

module.exports ={ validateRequestBody,ValidateEmail, doesuserExist}