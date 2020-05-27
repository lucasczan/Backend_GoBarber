import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const usersRepository = new UsersRepository();
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({ name, email, password });

    delete user.password;
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ errror: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      AvatarFilename: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  });

export default usersRouter;