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

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
      "smtps://todo.todo.90@mail.ru:g6XHF2pU8a9TBajW8XTC@smtp.mail.ru",
      defaults: {
        from: '"no reply" <todo.todo.90@mail.ru>',
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
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '145415',
      database: 'todo',
      models: [User, TaskList, Task],
      autoLoadModels: true,
      sync: { force: true },
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
