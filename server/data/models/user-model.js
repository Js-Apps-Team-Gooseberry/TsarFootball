/* globals require module */

const mongoose = require('mongoose'),
    encryptor = require('../../utils/encryptor'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 15,
        unique: true,
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    passHash: String,
    salt: String,
    email: String,
    profilePicture: {
        type: String,
        default: 'https://www.kirkleescollege.ac.uk/wp-content/uploads/2015/09/default-avatar.png'
    },
    registeredOn: {
        type: Date,
        default: Date.now
    },
    isDeleted: Boolean,
    admin: Boolean
});

userSchema.method({
    authenticate(password) {
        if (encryptor.generateHashedPassword(this.salt, password) === this.passHash) {
            return true;
        }

        return false;
    }
});

mongoose.model('user', userSchema);
let User = mongoose.model('user');

module.exports.User = User;