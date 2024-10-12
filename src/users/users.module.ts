import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsModule } from '../projects/projects.module';
import { BcryptService } from '../shared/hashing/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [ProjectsModule, JwtModule.registerAsync(jwtConfig.asProvider())],
  providers: [UsersResolver, UsersService, BcryptService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
