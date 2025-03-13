
const crypto = require('crypto');

const secret = 'hola refresh'
const secret2 = 'adios'

const hash = crypto.createHmac('sha256', secret).update(secret2).digest("hex");


console.log(hash)