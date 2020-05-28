/* eslint-disable consistent-return */
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsReposiotry);

//   const apointments = await appointmentsRepository.find();
//   response.json(apointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
