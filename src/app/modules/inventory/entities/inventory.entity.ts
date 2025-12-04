import { Table, Column, Model, PrimaryKey, Default, Index, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from '../../product/entities/product.entity';

@Table
export class Inventory extends Model<Inventory> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column({
        type: DataTypes.UUID,
        allowNull: false,
    })
    declare id: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare productId: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    declare quantity: number;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare location: string;

    @BelongsTo(() => Product)
    declare product: Product;
}
