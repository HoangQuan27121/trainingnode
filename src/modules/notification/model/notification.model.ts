import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AbstractEntity } from "../../../libs/common/abstract-base.model";
import { Task } from "../../task/model/task.model";
import { User } from "../../user/model/user.model";

@Entity({ name: "notifications" })
export class Notification extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: "varchar",
    nullable: false,
    name: "device_token"
  })
  deviceToken: string;

  @Index()
  @Column({
    type: "int",
    nullable: false,
    name: "task_id"
  })
  taskId: number;
  @OneToOne(() => Task)
  @JoinColumn({name: "task_id"})
  task: Task;

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
