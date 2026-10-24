import { Router } from 'express';
import { equiposController } from '../controllers/equipos.controllers';
import { validateEquiposPayload } from '../middlewares/validateEquipos.middleware';
const router = Router();

router.post('/',validateEquiposPayload, equiposController.newequipos);
router.get('/:id/ambiente',equiposController.getequipos)
router.patch('/estado',equiposController.updatestatus)

export default router;