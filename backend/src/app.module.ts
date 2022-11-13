import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { TasklistModule } from './tasklist/tasklist.module';
import { User } from './models/user.model';
import { TaskList } from './models/tasklist.model';
import { Task } from './models/task.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport:
      `smtps://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}`,
      defaults: {
        from: `"no reply" <${process.env.SMTP_USER}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },  
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../../', 'frontend', 'dist'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '145415',
      database: process.env.DB_NAME || 'todo',
      models: [User, TaskList, Task],
      autoLoadModels: true,
      sync: {force: true}
    }),
    UserModule,
    TasksModule,
    AuthModule,
    MailModule,
    TasklistModule,
  ],
})
export class AppModule {}
