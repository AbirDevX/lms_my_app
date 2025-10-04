/* eslint-disable prettier/prettier */
import {
    AllowNull,
    Column,
    Comment,
    DataType,
    Default,
    Model,
    Table,
    Unique
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    underscored: true,
    timestamps: false, // Since you're managing timestamps manually
})
export class User extends Model<User> {
    //   @PrimaryKey
    //   @AutoIncrement
    //   @Column(DataType.INTEGER)
    //   id: number;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    full_name: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    username: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    email: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    mobile: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    password: string;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    otp: string;

    @AllowNull(true)
    @Comment('OTP validate date')
    @Column(DataType.DATE)
    validate_otp: Date;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    lat: number;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    long: number;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    avatar: string;

    @AllowNull(false)
    @Default(0)
    @Comment('1 -> verified, 0 -> not verified')
    @Column(DataType.INTEGER)
    is_otp_verified: number;

    @AllowNull(true)
    @Default(1)
    @Comment('0 -> otp not verified, 1->only otp registered, 2->full registered')
    @Column(DataType.INTEGER)
    is_only_otp_registered: number;

    @AllowNull(false)
    @Default(1)
    @Column(DataType.INTEGER)
    status: number;

    @AllowNull(false)
    @Default(0)
    @Comment('0 -> not deleted, 1->deleted')
    @Column(DataType.INTEGER)
    is_deleted: number;

    @AllowNull(true)
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at: Date;

    @AllowNull(true)
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    updated_at: Date;
}
