import mongoose from "mongoose";
import validator from 'validator';
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please Enter ID"],
    },
    name: {
        type: String,
        required: [true, "Please  enter your Name"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validator.default.isEmail
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
        validate: {
            validator: function (value) {
                // Using validator's isByteLength method to validate byte length
                return validator.isByteLength(value, { min: 8 });
            },
            message: 'Password must be at least 8 characters long.'
        }
    },
    photo: {
        type: String,
        require: [true,]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: [true, "Please provide a Role"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is required']
    },
    dob: {
        type: Date,
        required: [true, "Enter the date of birth."],
        validate: validator.isDate
    }
}, {
    timestamps: true
});
userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || today.getDate() < dob.getDate()) {
        age--;
    }
    return age;
});
// Method to get full name
export const UserModel = mongoose.model("User", userSchema);
