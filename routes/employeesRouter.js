import {Router} from 'express'
import EmployeeController from '../controllers/EmployeeController.js'

const router = Router();

const controller = new EmployeeController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;