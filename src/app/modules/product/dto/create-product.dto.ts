import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Nome abreviado do produto',
        example: 'ARC',
    })
    @IsNotEmpty({ message: 'o Nome abreviado é obrigatóriO' })
    shortName: string;

    @ApiProperty({
        description: 'Nome completo do produto',
        example: 'Arruda-cheirosa',
    })
    @IsNotEmpty({ message: 'o Nome completo é obrigatóriO' })
    fullName: string;

    @ApiProperty({
        description: 'Unidade de Medida',
        example: 'Kg',
    })
    @IsNotEmpty({ message: 'A Unidade de Medida é obrigatória' })
    unitMeasure: string;

    @ApiProperty({
        description: 'Quantidade mínima necessária',
        example: 5,
    })
    @IsNotEmpty({ message: 'A quantidade minima é obrigatória' })
    quantMin: number;
}
