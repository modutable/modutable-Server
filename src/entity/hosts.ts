import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class hosts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  openDate: Date;
  @Column()
  CloseDate: Date;
  @Column()
  guestMin: number;
  @Column()
  guestMax: number;
  @Column()
  guests: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  deadline: Date;
  @Column()
  user_id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
