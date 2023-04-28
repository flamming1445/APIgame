const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "please enter username"]
        },
        password: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true
    }

)

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;