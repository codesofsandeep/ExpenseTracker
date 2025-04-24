

const mongoose = require('mongoose');

const bycrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
    {
        fullName: {type: String , required: true},
        email: {type: String , required: true},
        password : {type: String , required: true},
        profileImageURL: {type: String , default: null},
    },
    {timestamps: true}
);

//hash password 

UserSchema.pre("save" , async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bycrypt.hash(this.password , 10);
    next();
});

// compare paswords

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bycrypt.compare(candidatePassword , this.password);
};

module.exports = mongoose.model("User" , UserSchema)