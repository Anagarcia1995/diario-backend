const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '120m' });
};

module.exports = { generateToken };




// const jwt = require ('jsonwebtoken');

// const generateToken = (payload, isRefreshToken) => {
//     if(isRefreshToken){
//         return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, {
//             expiresIn: "120min",
//         });
//     }
//     return  jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "120min"});
// }


// module.exports = {generateToken}

