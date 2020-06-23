import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}


  public async execute({ email }: IRequest): Promise<void> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (!checkUser) {
      throw new AppError('User does not exist')
    }

    this.userTokensRepository.generate(checkUser.id);

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}


export default SendForgotPasswordEmailService;
