import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    tel:{
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Employee = mongoose.model('employee', EmployeeSchema);

export default Employee;