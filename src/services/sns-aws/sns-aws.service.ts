import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { Sms } from 'src/interfaces/sms.interface';
import { appendFile, existsSync, writeFile } from 'fs';

@Injectable()
export class SnsAwsService {
  client = new SNSClient({ region: 'us-east-1' });
  private readonly messageSms: Sms;

  sendSms = async (params: Sms) => {
    const publish = new PublishCommand(params);
    try {
      const data = await this.client.send(publish);
      const file = existsSync('logs.txt');
      if (file === false) {
        const now = new Date();
        writeFile(
          'logs.txt',
          // eslint-disable-next-line prettier/prettier
          `Time send: ${now} //😜 😜 Message enviado // ${params.Message} // al celular ${params.PhoneNumber} //Status ${data.$metadata.httpStatusCode} //Message Id ${data.MessageId} \r\n`,
          (err) => {
            if (err) throw err;
            // console.log('File is created successfully.');
          },
        );
      } else {
        const now = new Date();
        appendFile(
          'logs.txt',
          // eslint-disable-next-line prettier/prettier
          `Time send: ${now} //😜 😜 Message enviado // ${params.Message} // al celular ${params.PhoneNumber} //Status ${data.$metadata.httpStatusCode} //Message Id ${data.MessageId} \r\n`,
          (err) => {
            if (err) throw err;
            // console.log('File is created successfully.');
          },
        );
      }
      // eslint-disable-next-line prettier/prettier
    //   console.log(`😉😉 Respuesta de Publis comand: 😉😉`, data.$metadata.requestId);
      return data;
    } catch (err) {
      const now = new Date();
      appendFile(
        'error.txt',
        // eslint-disable-next-line prettier/prettier
        `Time send: ${now} //❌❌ Message NO enviado // ${params.Message} // al celular ${params.PhoneNumber} //Error ${err}  \r\n`,
        (err) => {
          if (err) throw err;
          // console.log('File is created successfully.');
        },
      );
      console.error(`❌❌ No funciono el servicion sendSms: ${err} ❌❌`);
    }
  };
}
