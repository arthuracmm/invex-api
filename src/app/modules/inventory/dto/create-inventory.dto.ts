import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
    @ApiProperty({
        description: 'ID do produto',
        example: 'UUID',
    })
    @IsNotEmpty({ message: 'ID do produto é obrigatório' })
    productId: string;

    @ApiProperty({
        description: 'Quantidade do produto',
        example: 20,
    })
    @IsNotEmpty({ message: 'A quantidade é obrigatória' })
    quantity: number;

    @ApiProperty({
        description: 'Localização do produto',
        example: 'K1',
    })
    @IsNotEmpty({ message: 'A Localização é obrigatória' })
    location: string;
}
