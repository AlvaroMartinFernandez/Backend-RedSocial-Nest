import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDate,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { Is } from 'sequelize-typescript';
// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   updatedAt: Date;
// }
// NO  FUNCIONA EN EL SWAGGER SI ES UNA EXTENSION DE UNA CLASE ABRIR ISSUE
export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre de Usuario',
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 15)
  name?: string;
  @ApiProperty({
    description: 'Nombre de Usuario',
    minimum: 6,
    maximum: 15,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 15)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
  password?: string;
  @ApiProperty({
    description: 'Url foto de usuario',
    required: false,
    default: `https://xsgames.co/randomusers/avatar.php?g=male`,
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  photourl?: string;
  @ApiProperty({
    description: 'Descripcion de usuario',
    minimum: 40,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(40, 200)
  description?: string;
  @ApiProperty({
    description: 'Fecha de actualizacion de usuario',
    required: false,
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
