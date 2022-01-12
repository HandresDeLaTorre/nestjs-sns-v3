/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import phone from 'phone';


import { messageRaw, Sms } from 'src/interfaces/sms.interface';
import { SnsAwsService } from 'src/services/sns-aws/sns-aws.service';

@Controller('send-aws')
export class SendAwsController {
  constructor(private readonly sns: SnsAwsService) {}

  @Post('smssend')
  @HttpCode(HttpStatus.OK)
  async webhook(@Body() payload: messageRaw) {
    const telefono = payload.phone.toString();

    const paisRaw1 = payload.country;
    const paisRaw2 = paisRaw1.substring( 0 , paisRaw1.length - 1);
    const pais = paisRaw2
    // const paisRaw = payload.country.toString();
    // const pais = paisRaw.toString();
    // const {alpha2} = pais
    

    const phoneValid = phone(telefono, {
      country: pais,
    });

    const messageToSend: Sms = {
      PhoneNumber: phoneValid.phoneNumber,
      Message: payload.message,
    };

    if (phoneValid.isValid === false) {
      // console.warn(
      //   `El numero ${payload.phone}  no es valido en ${pais} intenta de nuevo`,
      // );
      // eslint-disable-next-line prettier/prettier
      // console.log('Telefono: ', telefono);
      // console.log('Country: ', paisRaw.split(''));
      // console.log('Message: ', payload.message);
      
      console.log('Telefono validaddo es: ', phone( telefono, {
        country: pais ,
      }));
      
      console.log(`❌❌ No funciono el servicion sendSms: ❌❌`, ' telefono:', telefono, ' Pais: ', pais, 'Complete', phoneValid );
    } else {
      //   eslint-disable-next-line @typescript-eslint/no-unused-vars
      await this.sns.sendSms(messageToSend);
      //   .then((data) => {
      //     console.log(`**>>> Halgo esta sucediendo en el service`, data);
      //   });
      console.log(`**>>> Halgo esta sucediendo en el else ${pais}`, phoneValid);
    }
    return messageToSend;
  }
}
