const Product = require("../models/product.model")
const jwt = require("jsonwebtoken");
// Read all
module.exports.findAll = (req, res) => {
    Product.find({}).populate("createdBy").then(allProduct => res.json(allProduct))
        .catch(err => {
            console.log("Error", err);
            res.json(err)
        })
}

// create new 
module.exports.create = (request, response) => { 
    console.log(request.Token.firstName);  
    Product.create({...request.body, 
        addedBy:request.Token.firstName})        
        .then(Product => response.json(Product))
        .catch(err => response.status(400).json(err))
    }

// READ ONLY ONE 
module.exports.findOne = (req, res) => {

    Product.findById(req.params.id).populate("createdBy").then(oneProduct => {
        console.log(" Product Found : ", oneProduct);
        res.json(oneProduct)
    }).catch(err => {
        console.log("Error", err);
        res.json(err)
    })
}

// DELETE
module.exports.delete = (req, res) => {
    console.log(req.body);
    Product.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log("SERVER SUCCESS (DELETE)✅✅");
            res.json(result)
        })
        .catch(err => {
            console.log("SERVER ERROR (DELETE) ❌❌❌");
            res.json(err)
        })
}
// update
module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
      
        { new: true, runValidators: true }.exec()
    )
        .then(updateProduct => res.json(updateProduct))
        .catch((err) => {
            console.log("----------", err);
            return res.status(400).json(err)
        })
}
