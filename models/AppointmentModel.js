import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    time: {
        type:Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Appointment = mongoose.model('appointment', AppointmentSchema);

export default Appointment;