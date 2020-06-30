import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from './base.model';

export interface UserAttributes {
  id?: string;
  asanaGid?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table
export class Project extends BaseModel<Project> {
  // Attributes
  @Column({
    type: DataType.STRING,
    validate: {
      notEmpty: true,
    },
  })
  asanaGid!: string;
}
