import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsUrl, Length, Matches } from 'class-validator';
// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   updatedAt: Date;
// }
// NO  FUNCIONA EN EL SWAGGER SI ES UNA EXTENSION DE UNA CLASE ABRIR ISSUE
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Nombre de Usuario',
    minimum: 1,
    required: false,
  })
  @IsString()
  @Length(1, 15)
  name?: string;
  @ApiProperty({
    description: 'Nombre de Usuario',
    minimum: 6,
    maximum: 15,
    required: false,
  })
  @IsString()
  @Length(6, 15)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
  password?: string;
  @ApiProperty({
    description: 'Url foto de usuario',
    required: false,
    default: `https://xsgames.co/randomusers/avatar.php?g=male`,
  })
  @IsUrl()
  @Length(1, 200)
  photourl?: string;
  @ApiProperty({
    description: 'Descripcion de usuario',
    minimum: 40,
    required: false,
  })
  @IsString()
  @Length(40, 200)
  description?: string;
  @ApiProperty({
    description: 'Fecha de actualizacion de usuario',
    required: false,
    default: new Date(),
  })
  @IsDate()
  updatedAt?: Date;
}
