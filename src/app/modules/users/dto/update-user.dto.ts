import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'Nome completo do usuário',
        example: 'Ciclano Fulano Da Silva',
    })
    fullName?: string;

    @ApiProperty({
        description: 'Endereço de e-mail do usuário',
        example: '12345678901',
    })
    cpf?: string;

    @ApiProperty({
        description: 'Role do usuário',
        example: 'tecnical',
    })
    role?: string;

    @ApiProperty({
        description: 'Endereço de e-mail do usuário',
        example: 'invex@example.com',
    })
    @IsEmail({}, { message: 'E-mail inválido' })
    email?: string;

    @ApiProperty({
        description: 'Senha do usuário (mínimo 6 caracteres)',
        example: '123456',
    })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password?: string;

    @ApiProperty({
        description: 'Id do estabelecimento',
        example: 'UUID',
    })
    establishmentId?: string;
}
