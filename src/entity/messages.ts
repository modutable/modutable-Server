import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sendUser_id: number;
  @Column()
  getUser_id: number;
  @Column()
  message: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
