import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { PrismaService } from '@prisma/prisma.service';
import { HashService } from '@common/modules/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  /**
   * @description Creates a new user in the database.
   *  This method uses the Prisma service to create a user with the provided data.
   * It omits sensitive fields such as password and refreshToken from the returned user object.
   * @param {CreateUserDto} dto - The data transfer object containing user details.
   * @returns A promise that resolves to the created user object without the password and refreshToken fields.
   * @example
   * const newUser = await userService.create({
   * name: 'John Doe',
   * username: 'johndoe',
   * email: 'jon@doe.com',
   * password: 'securePassword123',
   * role: $Enums.Role.User,
   * isActive: true,
   * });
   * This will create a new user in the database and return the user object without the password and refreshToken fields.
   * @throws Will throw an error if the user creation fails, such as due to validation errors or database issues.
   */
  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: dto,
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * @description Retrieves all users from the database.
   * This method uses the Prisma service to fetch all user records, omitting sensitive fields such as password and refreshToken.
   * @returns A promise that resolves to an array of user objects without the password and refreshToken fields.
   * @example
   * const users = await userService.findAll();
   * This will return an array of all users in the database, excluding their passwords and refresh tokens.
   * @throws Will throw an error if the retrieval fails, such as due to database connection issues.
   */
  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * @description Retrieves a user by their ID from the database.
   * This method uses the Prisma service to find a user with the specified ID, omitting sensitive fields such as password and refreshToken.
   * @param {number} id - The unique identifier of the user to retrieve.
   * @returns A promise that resolves to the user object with the specified ID, excluding the password and refreshToken fields.
   * @example
   * const user = await userService.findOne(1);
   * This will return the user with ID 1, excluding their password and refresh token.
   * @throws Will throw an error if no user is found with the specified ID or if there are database issues.
   */
  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  /**
   * @description Retrieves a user by their email from the database.
   * This method uses the Prisma service to find a user with the specified email, omitting sensitive fields such as password and refreshToken.
   * @param {string} email - The email address of the user to retrieve.
   * @returns A promise that resolves to the user object with the specified email, excluding the password and refreshToken fields.
   * @throws Will throw an error if no user is found with the specified email or if there are database issues.
   *
   */
  findByEmail(email: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
  }

  /**
   * @description Retrieves a user by their username from the database.
   * This method uses the Prisma service to find a user with the specified username, omitting sensitive fields such as password and refreshToken.
   * @param {string} username - The username of the user to retrieve.
   * @returns A promise that resolves to the user object with the specified username, excluding the password and refreshToken fields.
   * @throws Will throw an error if no user is found with the specified username or if there are database issues.
   */
  findByUsername(username: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { username },
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * @description Updates a user's details in the database.
   * This method uses the Prisma service to update a user with the specified ID using the provided data transfer object (DTO).
   * It omits sensitive fields such as password and refreshToken from the returned user object.
   * @param {number} id - The unique identifier of the user to update.
   * @param {UpdateUserDto} dto - The data transfer object containing the updated user details.
   * @returns A promise that resolves to the updated user object without the password and refreshToken fields.
   * @throws Will throw an error if the update fails, such as due to validation errors or database issues.
   */
  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * @description Updates a user's password in the database.
   * This method uses the Prisma service to update the password of a user with the specified ID.
   * It omits sensitive fields such as refreshToken from the returned user object.
   * @param {number} id - The unique identifier of the user whose password is to be updated.
   * @param {UpdateUserPasswordDto} dto - The data transfer object containing the new password for the user.
   * @returns A promise that resolves to the updated user object without the refreshToken field.
   * @throws Will throw an error if the update fails, such as due to validation errors or database issues.
   */
  updatePassword(id: number, { password }: UpdateUserPasswordDto) {
    return this.prisma.user.update({
      where: { id },
      data: { password },
      omit: {
        refreshToken: true,
      },
    });
  }

  /**
   * @description Activates a user by setting their isActive status to true.
   * This method uses the Prisma service to update the isActive field of a user with the specified ID.
   * It omits sensitive fields such as password and refreshToken from the returned user object.
   * @param {number} id - The unique identifier of the user to activate.
   * @returns A promise that resolves to the updated user object with isActive set to true, excluding password and refreshToken fields.
   * @throws Will throw an error if the activation fails, such as due to validation errors or database issues.
   */
  activate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * @description Deactivates a user by setting their isActive status to false.
   * This method uses the Prisma service to update the isActive field of a user with the specified ID.
   * It omits sensitive fields such as password and refreshToken from the returned user object.
   * @param {number} id - The unique identifier of the user to deactivate.
   * @returns A promise that resolves to the updated user object with isActive set to false, excluding password and refreshToken fields.
   * @throws Will throw an error if the deactivation fails, such as due to validation errors or database issues.
   */
  deactivate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }

  /**
   * @description Removes a user from the database.
   * This method uses the Prisma service to delete a user with the specified ID.
   * It omits sensitive fields such as password and refreshToken from the returned user object.
   * @param {number} id - The unique identifier of the user to remove.
   * @returns A promise that resolves to the deleted user object without the password and refreshToken fields.
   * @throws Will throw an error if the removal fails, such as due to validation errors or database issues.
   */
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      omit: {
        password: true,
        refreshToken: true,
      },
    });
  }
}
