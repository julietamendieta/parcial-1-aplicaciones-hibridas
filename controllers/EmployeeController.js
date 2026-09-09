import Employee from "../models/EmployeeModel.js";

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
                message: 'Error al obtener carreras.'
            })
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const Employee = await Employee.findById(id);
            
            if(!Employee){
                return res.status(404).json({
                    message: 'Not Found',
                });
            }
            res.json({
                message: 'success',
                data: Employee
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
            const Employee = await Employee.create({name, duration, hours});
            res.status(201).json({
                message: 'success',
                data: Employee
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
            const Employee = await Employee.findByIdAndUpdate(id, {name, duration, hours, active}, {new: true});

            res.json({
                message: 'success',
                data: Employee
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
            const Employee = await Employee.findByIdAndDelete(id);

            if(!Employee){
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

export default EmployeeController;