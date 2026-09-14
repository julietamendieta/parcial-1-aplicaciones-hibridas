import Appointment from "../models/AppointmentModel.js";
import Employee from "../models/EmployeeModel.js";
import Client from "../models/ClientModel.js";

class AppointmentController{
    async getAll(req, res){
        try{
            const appointments = await Appointment.find().populate(['client','employee']);

            res.json({
                message: 'success',
                data: appointments
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la lista de turnos.'
            })
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const appointment = await Appointment.findById(id).populate(['client','employee']);
            
            if(!appointment){
                return res.status(404).json({
                    message: 'No encontrado.',
                });
            }
            res.json({
                message: 'success',
                data: appointment
            });
            

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener el turno.'
            })
        }
    }

    async create(req, res){
        try{
            const {time, duration, client, employee} = req.body;
            
            if( !time || !duration || !client || !employee){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }

            const employeeExists = await Employee.findById(employee);

            const clientExists = await Client.findById(client);

            if(!employeeExists){
                return res.status(404).json({
                    message: 'No hay ningún empleado registrado con ese nombre.'
                });
            }

            if(!clientExists){
                return res.status(404).json({
                    message: 'No hay ningún cliente registrado con ese nombre.'
                });
            }

            const appointment = await Appointment.create({time, duration, client, employee});
            res.status(201).json({
                message: 'success',
                data: appointment
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al crear el turno.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {time, duration, client, employee} = req.body;
            
            if( !time || !duration || !client || !employee){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }
            const appointment = await Appointment.findByIdAndUpdate(id, {time, duration, client, employee}, {new: true, runValidators: true});

            res.json({
                message: 'success',
                data: appointment
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar el turno.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const appointment = await Appointment.findByIdAndDelete(id);

            if(!appointment){
                return res.status(404).json({
                message: 'Turno no encontrado.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar el turno.'
            })
        }
    }
}

export default AppointmentController;