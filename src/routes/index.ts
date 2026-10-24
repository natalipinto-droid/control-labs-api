import { Router } from 'express';

import loanRoutes from './loan.routes';
import usersRoutes from './users.routes'
import ambientesRoutes from './ambientes.routes'
import equiposRoutes from './equipos.routes'


const apiRouter = Router();
apiRouter.use('/loans', loanRoutes);
apiRouter.use('/users', usersRoutes);
apiRouter.use('/ambientes', ambientesRoutes);
apiRouter.use('/equipos', equiposRoutes);
export default apiRouter;