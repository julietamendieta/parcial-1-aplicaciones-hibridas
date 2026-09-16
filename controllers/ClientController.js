import Client from "../models/ClientModel.js";
import Appointment from "../models/AppointmentModel.js";
import bcrypt from 'bcrypt';

class ClientController{
    async getAll(req, res){
        try{
            const clients = await Client.find().select('name email tel');

            res.json({
                message: 'success',
                data: clients
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la lista de clientes.'
            })
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const client = await Client.findById(id).select('name email tel');
            
            if(!client){
                return res.status(404).json({
                    message: 'No encontrado.',
                });
            }
            res.json({
                message: 'success',
                data: client
            });
            

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener el cliente.'
            })
        }
    }

    async getApptbyClient(req, res){
        try{
            const clientid = req.params.clientid;

            const clientExists = await Client.findById(clientid);
            
            if(!clientExists){
                return res.status(404).json({
                    message: 'No hay ningún cliente registrado con ese id.'
                });
            }
            
            const filter = {client:clientid};

            const appts = await Appointment.find(filter).populate(['client','employee']);

            res.json({
                message: 'success',
                data: appts
            })
        }catch (error){
            res.status(500).json({
                message: 'Error al obtener los turnos asignados a este empleado.'
            })
        }
    }

    async create(req, res){
        try{
            const {body} = req;
            const {name, email, password, tel} = body;

            if( !name || !email || !password || !tel){
                return res.status(403).send("Complete todos los campos obligatorios.")
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newClient = new Client({
                name,
                email,
                password: passwordHash,
                tel
            })
            newClient.save();
            const id = newClient._id;
            res.send(`Cliente registrado con el ID: ${id}`)
        }catch(error){
            res.status(500).json({
                message: 'Error al crear el cliente.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {name, email, password, tel} = req.body;
            
            if( !name || !email || !password || !tel){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const client = await Client.findByIdAndUpdate(id, {name, email, password: passwordHash, tel}, {new: true, runValidators: true});

            res.json({
                message: 'success',
                data: client
            })
        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar los datos del cliente.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const client = await Client.findByIdAndDelete(id);

            if(!client){
                return res.status(404).json({
                message: 'Cliente no encontrado.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar el cliente.'
            })
        }
    }
}

export default ClientController;