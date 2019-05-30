import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double
} from "typeorm";

@Entity()
export class images extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  @Column()
  host_id: number;
}
