import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepositoy';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
    );
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
})
