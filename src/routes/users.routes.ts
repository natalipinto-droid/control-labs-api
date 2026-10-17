import { Router } from 'express';
import { usersController } from '../controllers/users.controllers';

const router = Router();

router.get('/', usersController.getusers);
router.post('/:id/new',usersController.newusers)
router.get('/:id', usersController.getdetails)
router.patch('/rol', usersController.updaterol)
router.patch('/:id/delete',usersController.deletepusers)

export default router;