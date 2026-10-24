import { Router } from 'express';
import { ambientesController } from '../controllers/ambientes.controllers';
import { validateAmbientesPayload } from '../middlewares/validateAmbientes.middleware';

const router = Router();

router.get('/', ambientesController.getambientes);
router.post('/', validateAmbientesPayload,ambientesController.newambientes)
router.patch('/:id/delete',ambientesController.updateambientes)

export default router;