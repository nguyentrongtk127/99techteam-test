import { vaidateDto } from '../../utils/validate';
import { handleRequest } from '../../utils/request-handler';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, ListUserPagingDto, UpdateUserDto } from './user.dto';
import { NotFound } from '../../utils/error-handler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll = handleRequest(async (req) => {
    const { query } = req
    const dtoInstance = plainToInstance(ListUserPagingDto, query);
    await vaidateDto(dtoInstance)
    return this.userService.getAll(query as unknown as ListUserPagingDto);
  });

  getById = handleRequest(async (req) => {
    const result = await this.userService.getById(+req.params.id);
    if(!result) {
      throw new NotFound('User not found')
    }
    return result;
  });

  create = handleRequest(async (req) => {
    const { body } = req
    const dtoInstance = plainToInstance(CreateUserDto, body);
    await vaidateDto(dtoInstance)
    const user = await this.userService.create(body);
    return user.id;
  });

  update = handleRequest(async (req) => {
    const { body } = req
    const dtoInstance = plainToInstance(UpdateUserDto, body);
    await vaidateDto(dtoInstance)
    const result = await this.userService.update(+req.params.id, body);
    if(!result) {
      throw new NotFound('User not found')
    }
    return result;
  });

  delete = handleRequest(async (req) => {
    return this.userService.delete(+req.params.id);
  });
}
