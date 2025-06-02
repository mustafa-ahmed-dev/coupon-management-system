import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: User management
   * * /user:
   * *   post:
   * *     summary: Create a new user
   * *     tags: [User]
   * *     requestBody:
   * *       required: true
   * *       content:
   * *         application/json:
   * *           schema:
   * *             $ref: '#/components/schemas/CreateUserDto'
   * *     responses:
   * *       201:
   * *         description: User created successfully
   * *       400:
   * *         description: Bad request
   * *       500:
   * *         description: Internal server error
   * @param dto - The data transfer object for creating a user
   * @returns The created user
   * @throws {BadRequestException} If the input data is invalid
   * @throws {InternalServerErrorException} If there is an error during user creation
   * @description Creates a new user in the system.
   */
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  /**
   * @swagger
   * tags:
   * name: User
   * description: User management
   * * /user:
   * *   get:
   * *     summary: Retrieve all users
   * *     tags: [User]
   * *     responses:
   * *       200:
   * *         description: A list of users
   * *       500:
   * *         description: Internal server error
   * @returns An array of users
   * @throws {InternalServerErrorException} If there is an error during retrieval
   * @description Retrieves all users from the system.
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  /**
   * @swagger
   * tags:
   * name: User
   * description: User management
   * * /user/{id}:
   * *   patch:
   * *     summary: Update a user by ID
   * *     tags: [User]
   * *     parameters:
   * *       - in: path
   * *         name: id
   * *         required: true
   * *         schema:
   * *           type: integer
   * *     requestBody:
   * *       required: true
   * *       content:
   * *         application/json:
   * *           schema:
   * *             $ref: '#/components/schemas/UpdateUserDto'
   * *     responses:
   * *       200:
   * *         description: User updated successfully
   * *       400:
   * *         description: Bad request
   * *       404:
   * *         description: User not found
   * *       500:
   * *         description: Internal server error
   * @param id - The ID of the user to update
   * @param dto - The data transfer object for updating a user
   * @returns The updated user
   * @throws {BadRequestException} If the input data is invalid
   * @throws {NotFoundException} If the user with the specified ID does not exist
   * @throws {InternalServerErrorException} If there is an error during user update
   * @description Updates an existing user in the system by ID.
   * @param id - The ID of the user to update
   * @param dto - The data transfer object containing the updated user information
   */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  /**
   * @swagger
   * tags:
   * name: User
   * description: User management
   * * /user/{id}:
   * *   delete:
   * *     summary: Delete a user by ID
   * *     tags: [User]
   * *     parameters:
   * *       - in: path
   * *         name: id
   * *         required: true
   * *         schema:
   * *           type: integer
   * *     responses:
   * *       200:
   * *         description: User deleted successfully
   * *       404:
   * *         description: User not found
   * @param id - The ID of the user to delete
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
