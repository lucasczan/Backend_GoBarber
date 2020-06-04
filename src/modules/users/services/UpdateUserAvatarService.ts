import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import IStoravgeProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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

    @inject('StorageProvider')
    private storageProvider: IStoravgeProvider,
  ) {}

  public async execute({ user_id, AvatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(AvatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);


    return user;
  }
}

export default UpdateUserAvatarSevice;
