/* eslint-disable consistent-return */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsReposiotry from '../Repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsReposiotry);

  const apointments = await appointmentsRepository.find();
  response.json(apointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

  return response.status(200).json(appointment);
});

export default appointmentsRouter;
