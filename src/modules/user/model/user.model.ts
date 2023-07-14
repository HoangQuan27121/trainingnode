import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AbstractEntity } from "../../../libs/common/abstract-base.model";
import { Notification } from "../../notification/model/notification.model";

@Entity({ name: "users" })
export class User extends AbstractEntity {
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
    name: "role"
  })
  role: number;

  @Index()
  @Column({
    type: "varchar",
    length: "255",
    nullable: false,
    name: "user_name"
  })
  username: string;

  @Index()
  @Column({
    type: "varchar",
    length: "255",
    nullable: false,
    name: "password"
  })
  password: string;
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
