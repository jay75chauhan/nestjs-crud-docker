import { Controller ,Get,Post, Body,Param, Delete,Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if(!user){
      throw new Error('User not found');
    }else{
      return user;
    }
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
     const user = await this.usersService.findOne(id);
     if (!user) {
       throw new Error('User not found');
     } 
    return  await this.usersService.remove(id);
  }

}
