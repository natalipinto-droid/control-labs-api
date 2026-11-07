import { Router } from 'express';
import { AmbienteController } from '../controllers/ambientes.controllers';
import { validateAmbientePayload } from '../middlewares/validateAmbientes.middleware';

const router = Router();

router.get('/', AmbienteController.getAmbientesByFilter);
router.post('/', validateAmbientePayload, AmbienteController.createAmbiente);
router.patch('/:id/delete', AmbienteController.updateAmbiente);

export default router;