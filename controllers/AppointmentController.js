import Appointment from "../models/AppointmentModel.js";

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
            const Appointment = await Appointment.findById(id).populate(['client','employee']);
            
            if(!Appointment){
                return res.status(404).json({
                    message: 'No encontrado.',
                });
            }
            res.json({
                message: 'success',
                data: Appointment
            });
            

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener el turno.'
            })
        }
    }

    async create(req, res){
        try{
            const {time, duration, client} = req.body;
            
            if( !time || !duration || !client){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }
            const Appointment = await Appointment.create({time, duration, client});
            res.status(201).json({
                message: 'success',
                data: Appointment
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
            const {time, duration, client} = req.body;
            
            if( !time || !duration || !client){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }
            const Appointment = await Appointment.findByIdAndUpdate(id, {time, duration, client}, {new: true});

            res.json({
                message: 'success',
                data: Appointment
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
            const Appointment = await Appointment.findByIdAndDelete(id);

            if(!Appointment){
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