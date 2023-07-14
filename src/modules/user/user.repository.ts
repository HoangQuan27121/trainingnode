import { dataSource } from "../../database";
import { TypeORMRepository } from "../../libs/common/typeorm-repository";
import { User } from "./model/user.model";

interface TDataReqUser {
  username: string;
  password: string;
  role: number;
}

export class UserRepository extends TypeORMRepository<User> {
  constructor() {
    super(User, dataSource.manager);
  }

  createUser(user: User) {
    // return dataSource.manager.insert(User, user)
    const userRepository = dataSource.manager.getRepository(User);
    return userRepository.insert(user);
  }
  async getDataUser(rep: any) {
    // const id = rep.id
    const userRepository = dataSource.manager.getRepository(User);
    const result = await userRepository.createQueryBuilder("users").getMany();
  }

  async getDataUserByUserName(username: string) {
    const userRepository = dataSource.manager.getRepository(User);
    return userRepository
      .createQueryBuilder("users")
      .where("users.username = :username", { username })
      .getOne();
  }

  async insertUserData(dataReqUser: TDataReqUser) {
    console.log("dataReqUser", dataReqUser);
    const userRepository = dataSource.manager.getRepository(User);
    return userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: dataReqUser.username,
        password: dataReqUser.password,
        role: dataReqUser.role,
        name: "123",
        // created_at: new Date(),
        // updated_at: new Date()
      })
      .execute();
  }
}
