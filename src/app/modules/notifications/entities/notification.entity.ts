import { Table, Column, Model, PrimaryKey, Default, Index, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Notification extends Model<Notification> {
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
    declare message: string;

    @Column({
        type: DataTypes.BOOLEAN,
        allowNull: false,
    })
    declare read: boolean;
}
