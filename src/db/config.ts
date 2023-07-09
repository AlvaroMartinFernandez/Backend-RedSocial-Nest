import { ConfigService } from '@nestjs/config';
export class ConfigDB {
  static hostDataBase: string;
  static portDataBase: number;
  static userNameDataBase: string;
  static passwordDataBase: string;

  constructor(private readonly configService: ConfigService) {
    ConfigDB.hostDataBase = this.configService.get('HOSTDATABASE');
    ConfigDB.portDataBase = +this.configService.get('PORTDATABASE');
    ConfigDB.userNameDataBase = this.configService.get('USERNAMEDATABASE');
    ConfigDB.passwordDataBase = this.configService.get('PASSWORDDATABASE');
  }
}
