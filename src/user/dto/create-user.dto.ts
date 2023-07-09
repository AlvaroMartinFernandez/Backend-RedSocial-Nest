import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre de Usuario',
    minimum: 1,
    maximum: 15,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  name: string;
  @ApiProperty({
    description: 'Contraseña de Usuario',
    minimum: 6,
    maximum: 15,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
  password: string;
  @ApiProperty({
    description: 'Url foto de usuario',
    required: true,
    default: `https://xsgames.co/randomusers/avatar.php?g=male`,
  })
  @IsUrl()
  @Length(1, 200)
  photourl: string;
  @ApiProperty({
    description: 'Descripcion de usuario',
    minimum: 40,
    maximum: 200,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(40, 200)
  description: string;
}
