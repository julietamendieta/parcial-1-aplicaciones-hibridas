import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    time: {
        type:Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    }
});

const Appointment = mongoose.model('appointment', AppointmentSchema);

export default Appointment;