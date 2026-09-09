import appointmentsRouter from './appointmentsRouter.js';
import clientsRouter from './clientsRouter.js';
import employeesRouter from './employeesRouter.js'

const routerAPI = (app) => {
    app.use('/api/appointments', appointmentsRouter);
    app.use('/api/clients', clientsRouter);
    app.use('/api/employees', employeesRouter);
}

export default routerAPI;