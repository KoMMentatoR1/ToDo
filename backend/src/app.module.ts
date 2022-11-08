import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { TasklistModule } from './tasklist/tasklist.module';
import { User } from './user/user.model';
import { TaskList } from './tasklist/tasklist.model';
import { Task } from './tasks/task.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://todosender512@mail.ru:wKCLDqTJ1q7E0uM8bUvs@smtp.mail.ru',
      defaults: {
        from: '"no reply" <project.oop@mail.ru>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo',
      models: [User, TaskList, Task],
      autoLoadModels: true,
      /* sync: { alter: true }, */
      /* dialectOptions:{
                ssl:{
                    require: true,
                    rejectUnauthorized: false,
                }
            } */
    }),
    UserModule,
    TasksModule,
    AuthModule,
    MailModule,
    TasklistModule,
  ],
})
export class AppModule {}
