import { EntityManager, EntityTarget, Repository } from "typeorm";
import { AbstractEntity } from "./abstract-base.model";

export class TypeORMRepository<T extends AbstractEntity> extends Repository<T> {
  constructor(model: EntityTarget<T>, manager: EntityManager) {
    super(model, manager);
  }

  findOneAndOrder = async (condition: any, order?: any) => {
    return await this.findOne({
      where: condition,
      order: order || { year: "DESC", updatedAt: "DESC", createdAt: "DESC" }
    });
  };

  updateOrInsert = async (condition: any, data: any) => {
    const check = await this.findOneBy(condition);

    if (check) {
      return await this.save({
        ...check,
        ...data,
        updatedAt: new Date()
      });
    }

    return await this.save(data);
  };

  findOrInsert = async (condition: any, data: any) => {
    const check = await this.findOneBy(condition);

    if (!check) {
      return await this.save(data);
    }

    return check;
  };

  findAndDelete = async (condition: any) => {
    const res = await this.findOneBy(condition);

    if (res) {
      return await this.remove(res);
    }
  };
}
