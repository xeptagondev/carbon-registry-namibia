import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NationalAPIController } from './national.api.controller';
import { NationalAPIService } from './national.api.service';
import configuration from '../shared/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../shared/typeorm.config.service';
// import { Programme } from './entities/programme.entity';
import { AuthModule } from '../shared/auth/auth.module';
import { CaslModule } from '../shared/casl/casl.module';
import { ProgrammeModule } from '../shared/programme/programme.module';
import { CompanyModule } from '../shared/company/company.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { CompanyController } from './company.controller';
import { UserModule } from '../shared/user/user.module';
import { ProgrammeController } from './programme.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: undefined
    }),
    AuthModule,
    UserModule,
    CaslModule,
    ProgrammeModule,
    CompanyModule
  ],
  controllers: [ NationalAPIController, UserController, AuthController, CompanyController, ProgrammeController ],
  providers: [
    NationalAPIService, 
    Logger
  ],
})
export class NationalAPIModule {}
