import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers'
import AppointmentsReposiotry from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsReposiotry',
  AppointmentsReposiotry,
)
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
