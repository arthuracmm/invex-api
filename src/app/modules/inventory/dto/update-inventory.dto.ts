import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateInventoryDto {
    @ApiProperty({
        description: 'Quantidade do produto',
        example: 20,
    })
    @IsNotEmpty({ message: 'A quantidade é obrigatória' })
    quantity: number;
}
