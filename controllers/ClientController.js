import Client from "../models/ClientModel.js";
import Appointment from "../models/AppointmentModel.js";
import bcrypt from 'bcrypt';

class ClientController{
    async getAll(req, res){
        try{
            const clients = await Client.find();

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
            const Client = await Client.findById(id);
            
            if(!Client){
                return res.status(404).json({
                    message: 'No encontrado.',
                });
            }
            res.json({
                message: 'success',
                data: Client
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
                return res.status(403).send("Complete todos los campor obligatorios.")
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
            const {id} = req.params;
            const {body} = request;
            const {name, email, password, tel} = body;

            if( !name || !email || !password || !tel){
                return response.status(403).send("Faltan parámetros")
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const data = {
                name,
                email,
                password: passwordHash,
                tel
            }
            const client = await Client.findByIdAndUpdate(id, data);
            client.save();
            response.status(200).json({message: 'Datos actualizados', data: {}});
        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar los datos del cliente.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const Client = await Client.findByIdAndDelete(id);

            if(!Client){
                return res.status(404).json({
                message: 'Cliente no encontrado.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminarel cliente.'
            })
        }
    }
}

export default ClientController;