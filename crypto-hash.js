const crypto = require('crypto')
 const cryptoHash = (...input)=>{
   const hash = crypto.createHash('sha256')
   hash.update(input.join(''));
   return hash.digest("hex")
}

result = cryptoHash("hello","world");

module.exports = cryptoHash