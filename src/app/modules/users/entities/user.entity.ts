import { Table, Column, Model, PrimaryKey, Default, Index, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column({
        type: DataTypes.UUID,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataTypes.STRING(150),
        allowNull: false,
    })
    declare fullName: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string;

    @Index({ unique: true })
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare password: string;
}
