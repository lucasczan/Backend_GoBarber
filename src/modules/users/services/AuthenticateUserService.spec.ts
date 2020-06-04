import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AuthenticateUserService from './AuthenticateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'JaneDoe@contact.com',
      password: '1234',
    })
    const response = await authenticateUser.execute({
      email: 'JaneDoe@contact.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  });

  it('should not be able to authenticate a non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);


    expect(authenticateUser.execute({
      email: 'JaneDoeeeee@contact.com',
      password: '1234',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to authenticate an user with wrong pssword', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);


    await createUser.execute({
      name: 'Jane Doe',
      email: 'JaneDoe@contact.com',
      password: '1234',
    })
    expect(authenticateUser.execute({
      email: 'JaneDoe@contact.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError)
  });
})
