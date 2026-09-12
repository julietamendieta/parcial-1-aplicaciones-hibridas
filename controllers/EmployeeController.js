import Employee from "../models/EmployeeModel.js";
import Appointment from "../models/AppointmentModel.js";

class EmployeeController{
    async getAll(req, res){
        try{
            const employees = await Employee.find();

            res.json({
                message: 'success',
                data: employees
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la lista de empleados.'
            })
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const Employee = await Employee.findById(id);
            
            if(!Employee){
                return res.status(404).json({
                    message: 'No Encontrado.',
                });
            }
            res.json({
                message: 'success',
                data: Employee
            });
            

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener el empleado.'
            })
        }
    }

    async getApptbyEmployee(req, res){
        try{
            const employeeid = req.params.employeeid;
            
            const filter = {employee:employeeid};

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
            const {name, email, tel} = req.body;
            
            if( !name || !email || !tel){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }
            const Employee = await Employee.create({name, email, tel});
            res.status(201).json({
                message: 'success',
                data: Employee
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al crear el empleado.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {name, email, tel} = req.body;
            
            if( !name || !email || !tel){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }
            const Employee = await Employee.findByIdAndUpdate(id, {name, email, tel}, {new: true});

            res.json({
                message: 'success',
                data: Employee
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar los datos del empleado.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const Employee = await Employee.findByIdAndDelete(id);

            if(!Employee){
                return res.status(404).json({
                message: 'Empleado no encontrado.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar el empleado.'
            })
        }
    }
}

export default EmployeeController;