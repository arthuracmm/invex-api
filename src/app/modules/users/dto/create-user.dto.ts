import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Ciclano Fulano Da Silva',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  fullName: string;

  @IsNotEmpty({ message: 'o CPF é obrigatóriO' })
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: '12345678901',
  })
  cpf: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'invex@example.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: '123456',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
