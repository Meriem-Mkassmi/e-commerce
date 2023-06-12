const jwt = require("jsonwebtoken");
const secret =  process.env.secret_key;

module.exports.authenticate = (req, res, next) =>{
  // console.log(req.cookies.usertoken);
  jwt.verify(req.cookies.usertoken, secret, (err, payload) =>{
      if(err){
          console.log("Authentication failed!");
          res.status(401).json({verified: false});
      }else{
          req.Token=payload;
          next();
      }
  } )
}

