import { hashPassword } from '../../utils/hash';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto, ListUserPagingDto, UpdateUserDto } from './user.dto';
import { ILike } from 'typeorm';
import { USER_STATUS } from './user.enum';

export class UserService {
  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.fullname = data.fullname;
    user.status = data.status || USER_STATUS.PENDING;
    user.password = await hashPassword(data.password);
    return user.save();
  }

  async update(id: number, data: UpdateUserDto): Promise<boolean> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return false;
    }
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    await User.update(id, data);
    return true;
  }
  async getAll(query: ListUserPagingDto): Promise<{
    page: number;
    size: number;
    total: number;
    data: User[];
  }> {
    const { keyword, status } = query;
    const page = +query.page || 1;
    const size = +query.size || 20;
    const queryBuilder = User.createQueryBuilder('users').select([
      'users.id',
      'users.email',
      'users.fullname',
      'users.status',
      'users.createdAt',
      'users.updatedAt',
    ]);
    const conditions = [];
    if (keyword) {
      conditions.push([{ fullname: ILike(`%${keyword}%`) }, { email: ILike(`%${keyword}%`) }]);
    }
    if (status) {
      conditions.push({ status });
    }
    conditions.forEach((condition, index) => {
      if (index === 0) {
        queryBuilder.where(condition);
      } else {
        queryBuilder.andWhere(condition);
      }
    });
    const [data, count] = await queryBuilder
      .offset((page - 1) * size)
      .limit(size)
      .orderBy('created_at', 'DESC')
      .getManyAndCount();

    return {
      page,
      size,
      total: count,
      data: data,
    };
  }

  async getById(id: number): Promise<User | null> {
    return User.findOne({ select: ['id', 'email', 'fullname', 'status', 'createdAt', 'updatedAt'], where: { id } });
  }

  async delete(id: number): Promise<boolean> {
    const result = await User.delete(id);
    return !!result;
  }
}
