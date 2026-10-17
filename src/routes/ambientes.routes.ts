import { Router } from 'express';
import { ambientesController } from '../controllers/ambientes.controllers';

const router = Router();

router.get('/', ambientesController.getambientes);
router.post('/:id/new',ambientesController.newambientes)
router.patch('/:id/delete',ambientesController.updateambientes)

export default router;