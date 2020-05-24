import { Router } from 'express';
import appoitmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appoitmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) => {
  response.json({ ok: true });
});

export default routes;
