import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSwitchPasswordCodeMail(email: string, key: string) {
    await this.mailerService.sendMail({
      from: process.env.SMTP_USER,
      to: `${email}`,
      subject: 'Код для смены пароля',
      text: '',
      html: `
                <div>
                    <h1>Код для смены пароля</h1>
                    <p>${key}</p>
                </div>
                `,
    });
  }

  sendActivation(email: string, link: string): void {
    const finLink = 'http://' + process.env.API_URL + link;
    this.mailerService
      .sendMail({
        to: `${email}`, // list of receivers
        from: process.env.SMTP_USER, // sender address
        subject: 'Подтверждение почты ✔', // Subject line
        html: `<div>
                <style>
                    a{
                        color: blue
                    }
                </style>
                <h1> Для подтверждения смены пароля перейдите по ссылке</h1>
                <a class="blue" href="${finLink}">${finLink}</a>
            </div>`, // HTML body content
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);

        throw new HttpException(
          'Ошибка отправления сообщения',
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
