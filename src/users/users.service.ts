import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'name1',
      email: 'email1',
      role: 'role1',
    },
    {
      id: 2,
      name: 'name2',
      email: 'email2',
      role: 'role2',
    },
    {
      id: 3,
      name: 'name3',
      email: 'email3',
      role: 'role3',
    },
    {
      id: 4,
      name: 'name4',
      email: 'email4',
      role: 'role4',
    },
    {
      id: 5,
      name: 'name5',
      email: 'email5',
      role: 'role5',
    },
  ];

  findall(role?: 'ADMIN' | 'USER' | 'SUPERADMIN') {
    if (role) {
      const rolesArray = this.users.filter((usr) => usr.role === role);

      if (!rolesArray.length) {
        throw new NotFoundException('User Role Not Found');
      } else {
        return rolesArray;
      }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((usr) => usr.id === id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((usr) => {
      if (usr.id === id) {
        return {
          ...usr,
          ...updateUserDto,
        };
      }
      return usr;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((usr) => usr.id !== id);

    return removedUser;
  }
}
