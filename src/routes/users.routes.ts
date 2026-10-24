import { Router } from 'express';
import { usersController } from '../controllers/users.controllers';
import { validateUserPayload } from '../middlewares/validateUsers.middleware';
const router = Router();

router.get('/',validateUserPayload , usersController.getusers);
router.post('/',usersController.newusers)
router.get('/:id', usersController.getdetails)
router.patch('/rol', usersController.updaterol)
router.patch('/:id/delete',usersController.deletepusers)

export default router;