import { container } from 'tsyringe'
import { Request, Response } from 'express'

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({ name, email, password });

      delete user.password;
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ errror: error.message });
    }
  }
}


export default UsersController;
