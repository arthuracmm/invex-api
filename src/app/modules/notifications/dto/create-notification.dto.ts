import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
    @ApiProperty({
        description: 'Mensagem desejada',
        example: 'ARR-Arruda está com pouca quantidade',
    })
    @IsNotEmpty({ message: 'A mensagem é obrigatória' })
    message: string;

    @ApiProperty({
        description: 'Definição se aquela notificação já foi lida',
        example: true,
    })
    @IsNotEmpty({ message: 'O status de leitura é obrigatório' })
    read: boolean;
}
