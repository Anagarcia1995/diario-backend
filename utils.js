const jwt = require ('jsonwebtoken');


const generateToken = (payload, isRefreshToken) => {
    if(isRefreshToken){
        return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, {
            expiresIn: "120min",
        });
    }
    return  jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "120min"});
}


module.exports = {generateToken}