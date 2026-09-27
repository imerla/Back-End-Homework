import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/authdb';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(mongoUri),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
