import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest{
  user_id: string;
  AvatarFilename: string;

}

@injectable()
class UpdateUserAvatarSevice {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, AvatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // deleta avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = AvatarFilename;

    await this.usersRepository.save(user);


    return user;
  }
}

export default UpdateUserAvatarSevice;
