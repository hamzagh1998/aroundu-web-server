import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    const savedEntity = await entity.save();
    return savedEntity.toObject({ versionKey: false });
  }

  // check if doc exists and return it if so
  async checkAndCreate(
    entityFilterQuery: FilterQuery<T>,
    createEntityData: unknown
  ) {
    const entityDoc = await this.entityModel.findOne(entityFilterQuery);
    if (entityDoc) return entityDoc;

    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projctions?: Record<string, unknown>
  ) {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projctions,
      })
      .lean();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projctions?: Record<string, unknown>
  ) {
    return this.entityModel
      .find(entityFilterQuery, {
        __v: 0,
        ...projctions,
      })
      .lean();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEndtityData: UpdateQuery<unknown>
  ) {
    return this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEndtityData, { new: true })
      .lean();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>) {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async aggregate(entityPipelineQuery: object[]) {
    return this.entityModel.aggregate(entityPipelineQuery as any).exec();
  }
}
