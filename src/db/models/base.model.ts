import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  DataType,
  Table,
  UpdatedAt,
  AutoIncrement,
} from 'sequelize-typescript';

/*

  Add defaults attributes. Other models will inherit from this class

  */
@Table
export class BaseModel<T> extends Model<T> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
