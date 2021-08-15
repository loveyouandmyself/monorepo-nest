import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserAllDto, UserListDto } from '../dto';
import { UserInfoSchema, UserListSchema } from '../schemas';
import { UserService } from '../services';

@Resolver(() => UserInfoSchema)
export class UserResolver{
  constructor(
    private readonly userService: UserService
  ){ }

  @Query(() => UserInfoSchema, { description: '根据ID获取用户详细信息' })
  public async getUserInfo(@Args({
    name: 'id',
    type: ()=>String,
  }) id: string): Promise<UserInfoSchema>{
    return this.userService.getInfo(id);
  }

  @Query(() => UserListSchema, { description: '获取用户列表' })
  public async getUserList(
    @Args({
      type: ()=>UserListDto,
    }) args: UserListDto
  ): Promise<UserListSchema>{
    return this.userService.getList(args);
  }

  @Query(() => [UserInfoSchema], { description: '获取所有用户' })
  public async getAllUser(
    @Args({
      type: ()=>UserAllDto,
    }) args: UserAllDto
  ): Promise<UserInfoSchema[]>{
    return this.userService.getAll(args);
  }


}