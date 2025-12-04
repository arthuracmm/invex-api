import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersSwagger } from './anottations/users.anottation';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsersSwagger.CreateUser.ApiOperation
  @UsersSwagger.CreateUser.ApiResponse401
  @UsersSwagger.CreateUser.ApiResponse500
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
  }

  @Get()
  @UsersSwagger.GetAllUsers.ApiOperation
  @UsersSwagger.GetAllUsers.ApiResponse200
  @UsersSwagger.GetAllUsers.ApiResponse401
  @UsersSwagger.GetAllUsers.ApiResponse500
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UsersSwagger.GetById.ApiOperation
  @UsersSwagger.GetById.ApiResponse200
  @UsersSwagger.GetById.ApiResponse401
  @UsersSwagger.GetById.ApiResponse500
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UsersSwagger.PutById.ApiOperation
  @UsersSwagger.PutById.ApiResponse401
  @UsersSwagger.PutById.ApiResponse500
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UsersSwagger.DeleteUser.ApiOperation
  @UsersSwagger.DeleteUser.ApiResponse200
  @UsersSwagger.DeleteUser.ApiResponse401
  @UsersSwagger.DeleteUser.ApiResponse500
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { deleted: id };
  }
}
