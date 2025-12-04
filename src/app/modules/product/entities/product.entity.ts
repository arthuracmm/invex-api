import { Table, Column, Model, PrimaryKey, Default, Index, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Product extends Model<Product> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column({
        type: DataTypes.UUID,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare shortName: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare fullName: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare unitMeasure: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    declare quantMin: number;
}
