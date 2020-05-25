/* eslint-disable consistent-return */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsReposiotry from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsReposiotry();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsReposiotry);

//   const apointments = await appointmentsRepository.find();
//   response.json(apointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

  return response.status(200).json(appointment);
});

export default appointmentsRouter;
