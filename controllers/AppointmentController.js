import Appointment from "../models/AppointmentModel.js";

class AppointmentController{
    async getAll(req, res){
        try{
            const appointments = await Appointment.find();

            res.json({
                message: 'success',
                data: appointments
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener carreras.'
            })
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const Appointment = await Appointment.findById(id);
            
            if(!Appointment){
                return res.status(404).json({
                    message: 'Not Found',
                });
            }
            res.json({
                message: 'success',
                data: Appointment
            });
            

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la materia.'
            })
        }
    }

    async create(req, res){
        try{
            const {name, duration, hours} = req.body;
            
            if( !name || !duration || !hours){
                return response.status(403).send("Faltan parámetros")
            }
            const Appointment = await Appointment.create({name, duration, hours});
            res.status(201).json({
                message: 'success',
                data: Appointment
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al crear la materia.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {name, duration, hours, active} = req.body;
            
            if( !name || !duration || !hours || !active){
                return response.status(403).send("Faltan parámetros")
            }
            const Appointment = await Appointment.findByIdAndUpdate(id, {name, duration, hours, active}, {new: true});

            res.json({
                message: 'success',
                data: Appointment
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar la materia.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const Appointment = await Appointment.findByIdAndDelete(id);

            if(!Appointment){
                return res.status(404).json({
                message: 'Materia no encontrada'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar la materia.'
            })
        }
    }
}

export default AppointmentController;