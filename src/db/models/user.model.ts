import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from './base.model';

export interface UserAttributes {
  id?: string;
  nexudusId?: string;
  slackId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table
export class User extends BaseModel<User> {
  // Attributes
  
  @Column({
    type: DataType.STRING,
    validate: {
      notEmpty: true,
    },
  })
  slackId!: string;

  // Relationships: None
}
