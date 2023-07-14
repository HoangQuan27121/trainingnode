import { dataSource } from "../../database";
import { TypeORMRepository } from "../../libs/common/typeorm-repository";
import { User } from "./model/user.model";

export class UserRepository extends TypeORMRepository<User> {
  constructor() {
    super(User, dataSource.manager);
  }

  createUser(user: User) {
    // return dataSource.manager.insert(User, user)
    const userRepository = dataSource.manager.getRepository(User)
    return userRepository.insert(user)
  }
}
