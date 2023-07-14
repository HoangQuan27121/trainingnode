import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../libs/common/abstract-base.model";
import {User} from '../../user/model/user.model';

@Entity({ name: "tasks" })
export class Task extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: "varchar",
    length: "255",
    nullable: false,
    name: "name"
  })
  name: string;

  @Index()
  @Column({
    type: "int",
    nullable: false,
    name: "user_id"
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({name: "user_id"})
  user: User;
}
