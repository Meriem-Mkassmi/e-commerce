const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
 
    productName: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "It must be more than three characters"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "It must be more than ten characters"],
    },
    typeOfProduct: {
        type: String,
        required: [true, "Product type is required"],
        enum: ["phone", "laptop", "cosmetic", "games", "car"],
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
        match: [
            /^https?:\/\/\S+/,
            "Invalid URL format. Must start with http:// or https://",
        ],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than to zero"],
    },

    addedBy: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Product= mongoose.model("Product", ProductSchema);
module.exports = Product;
