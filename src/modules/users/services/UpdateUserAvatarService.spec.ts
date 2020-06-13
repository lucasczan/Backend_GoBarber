
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'


describe('UpdateUSerAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

    const user = await fakeUserRepository.create({
      name: 'John Dore',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })
    expect(user.avatar).toBe('avatar.jpg')
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

    const user = await fakeUserRepository.create({
      name: 'John Dore',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    })


    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  })
});
