import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService {
  constructor(private httpService: HttpService) {}

  //   contactsMautic(){
  //     const tags = this.httpService.get();
  //   }
}
