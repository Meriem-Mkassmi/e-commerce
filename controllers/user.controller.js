const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const bcrypt = require('bcrypt')

module.exports = {
  findAll: (req,res) =>{
      User.find()
          .then(allUsers =>res.json(allUsers))
          .catch(err => res.status(400).json(err))
  },
  findOneUser: (req,res) =>{
      User.findOne({email: req.body.email} )
          .then((user) =>{
              const {_id, firstName,lastName,...other} = user;
              res.json(user)
          })
          .catch(err => res.status(400).json(err))
  },
  register: (req, res) => {
    User.create(req.body)
      .then(user => {
          const userToken = jwt.sign({
              id: user._id
          }, process.env.SECRET_KEY);
   
          res
              .cookie("usertoken", userToken, {
                  httpOnly: true
              })
              .json({ msg: "success!", user: user });
      })
      .catch(err => res.json(err));
  },
  login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
},
  // Logout Function 
  logout: (req, res)=>{
      res.clearCookie("usertoken").json({message:"success"})
  },
  isLoggedIn : async (req, res) =>{
      jwt.verify(req.cookies.usertoken, secret, async (err, payload) =>{
          if(err){
              console.log("Authetication failed!");
              res.status(401).json({verified: false});
          }else{
              const user = await User.findOne({_id:payload._id})
              const { _id, firstName, lastName } = user
              return res.json({id:_id, firstName:firstName, lastName: lastName})
          }
      } )
  }
}

module.exports.deleteProductFromUser = (req, res) => {
    const { userId, productId } = req.body;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const productIndex = user.product.indexOf(productId);

        if (productIndex === -1) {
          throw new Error("Product not found in user's product list");
        }

        // Remove the  from liste of the user 
        user.product.splice(productIndex, 1);

        return user.save();
      })
      .then((user) => res.json({ user }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  };


  module.exports.addProductToUser = (req, res) => {
    const { userId, productId } = req.body;

    User.findById(productId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.product.push(productId);

        return user.save();
      }).then((user) => {
        console.log("teste");

        Product.findOneAndUpdate(

          { _id: jobId },

          { upsert: true, new: true }
        );

        // console.log(Product._id)


        return user;
      })
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  };
  // Find user with products and populate
  module.exports.findUserWithProduct = (req, res) => {

    User.findById(req.params.id).select("-password -confirmPassword")
      .populate("product").then(oneUser => {
        console.log(" UserFound : ", oneUser);
        res.json(oneUser)
      }).catch(err => {
        console.log("Error", err);
        res.json(err)
      })
  }