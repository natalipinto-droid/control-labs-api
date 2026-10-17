import { Router } from 'express';
import { equiposController } from '../controllers/equipos.controllers';

const router = Router();

router.post('/:id/ambiente/relacion', equiposController.newequipos);
router.get('/:id/ambiente',equiposController.getequipos)
router.patch('/estado',equiposController.updatestatus)

export default router;