import { Table, Column, Model, PrimaryKey, Default, Index, ForeignKey, BelongsTo, HasMany, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Table
export class Movimentation extends Model<Movimentation> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column({
        type: DataTypes.UUID,
        allowNull: false,
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare userId: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare productId: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare type: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare location: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    declare quantity: number;

    @BelongsTo(() => Product)
    declare product: Product;

    @BelongsTo(() => User)
    declare user: User;
}
