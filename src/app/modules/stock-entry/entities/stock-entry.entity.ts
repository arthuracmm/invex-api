import { Table, Column, Model, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Table
export class StockEntry extends Model<StockEntry> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column({
        type: DataTypes.UUID,
        allowNull: false,
    })
    declare id: string;

    @ForeignKey(() => Inventory)
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare inventoryId: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    declare receivedQuantity: number;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare location: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare note: string;

    @BelongsTo(() => Inventory)
    declare inventory: Inventory;
}
