const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "It must be more than two characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "It must be more than two characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[a-zA-Z0-9._-]+@dojo\.tn$/,
            "Please provide a valid email address in the format 'name@dojo.tn'",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;





