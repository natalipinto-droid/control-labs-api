import { Router } from 'express';
import { UserController } from '../controllers/users.controllers';
import { validateUserPayload } from '../middlewares/validateUsers.middleware';

const router = Router();

router.get('/', validateUserPayload, UserController.getUsersByFilter);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.patch('/rol', UserController.updateUser);
router.patch('/:id/delete', UserController.updateUser);

export default router;