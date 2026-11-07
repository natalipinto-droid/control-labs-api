import { Router } from 'express';
import { EquipoController } from '../controllers/equipos.controllers';
import { validateEquipoPayload } from '../middlewares/validateEquipos.middleware';

const router = Router();

router.post('/', validateEquipoPayload, EquipoController.createEquipo);
router.get('/:id/ambiente', EquipoController.getEquiposByFilter);
router.patch('/estado', EquipoController.updateEquipo);

export default router;