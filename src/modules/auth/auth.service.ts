import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { users } from '../../../db/schemas/schema';
import { db } from '../../config/db';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    console.log({ registerDto });
    return db.insert(users).values([
      {
        email: registerDto.email,
        password: registerDto.password,
      },
    ]);
  }

  async login(loginDto: LoginDto) {
    // const selectedUsers = await db
    //   .select()
    //   .from(users)
    //   .where(
    //     and(
    //       eq(users.email, loginDto.email),
    //       eq(users.password, loginDto.password),
    //     ),
    //   )
    //   .limit(1);

    // if (selectedUsers.length === 0) {
    //   throw new Error('User not exists');
    // }

    // return selectedUsers[0];

    const userFound = await db.query.users.findFirst({
      where: and(
        eq(users.email, loginDto.email),
        eq(users.password, loginDto.password),
      ),
    });

    if (userFound === undefined) {
      throw new Error('User not exists');
    }

    return userFound;
  }
}
